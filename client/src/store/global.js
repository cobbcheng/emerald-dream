import { observable, action } from 'mobx';

class GlobalState {
  @observable current = 0;

  @action.bound
  tab(index) {
    this.current = index;
  }
}

export default new GlobalState();
