interface goods_list {
  id: number;
  uid: string;
  name: string;
  head_pic: string;
  price: number;
  total: number;
  be_left: number;
}

interface goods_detail {
  id: number;
  uid: string;
}

interface user_info {
  id: number;
  uid: string;
  name: string;
  avatar: string;
  wallet: number;
}

interface address_info {
  uid: string;
}

interface order_info {
  order_id: string;
  goods_id: string;
  order_time: string;
  status: number;
}
