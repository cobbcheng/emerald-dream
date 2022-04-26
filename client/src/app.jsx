import { Component } from 'react';
import { Provider } from 'mobx-react';
import Common from './components/Common';
import store from './store/index';

import './app.less';
class App extends Component {
  componentDidMount() {}

  componentDidShow() {}

  componentDidHide() {}

  componentDidCatchError() {}

  // this.props.children 就是要渲染的页面
  render() {
    return (
      <Provider store={store}>
        <Common>{this.props.children}</Common>
      </Provider>
    );
  }
}

export default App;
