import { observable, action } from 'mobx';
import { getCloud } from '@/helper/cloud';

class UserInfo {
  constructor() {
    this.db = getCloud().db;
    this.callFunction = getCloud().callFunction;
  }

  @observable userInfo = {};
  @observable userInfoReady = false;
  @observable openid = '';
  @observable isShowAuthDialog = false;

  @action.bound
  async getUserInfo() {}

  @action.bound
  bindGetUserInfo() {
    wx.getUserProfile({
      desc: '用于完善会员资料',
      success: (res) => {
        this.userInfo = res.userInfo;
        this.isShowAuthDialog = false;
        this.setUserInfo();
      },
    });
  }

  @action.bound
  async setUserInfo() {
    let res;
    try {
      res = await this.db.collection('user_info').doc(this.openid).get();
      this.db
        .collection('user_info')
        .doc(this.openid)
        .update({
          data: {
            nickName: this.userInfo.nickName,
            avatarUrl: this.userInfo.avatarUrl,
          },
        });
    } catch (e) {
      this.db.collection('user_info').add({
        data: {
          _id: this.openid,
          nickName: this.userInfo.nickName,
          avatarUrl: this.userInfo.avatarUrl,
        },
      });
    }
  }

  @action.bound
  async getOpenId() {
    const res = await this.callFunction({
      name: 'getOpenId',
    });
    this.openid = res.result.openid;
    try {
      const r = await this.db.collection('user_info').doc(this.openid).get();
      this.userInfoReady = true;
      this.userInfo = r.list[0];
    } catch (e) {}
  }

  @action.bound
  isLogin() {
    if (this.userInfoReady) {
      return true;
    }
    this.isShowAuthDialog = true;
    return false;
  }

  @action.bound
  closeDialog() {
    this.isShowAuthDialog = false;
  }
}

export default new UserInfo();
