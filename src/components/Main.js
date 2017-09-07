// require('normalize.css/normalize.css');
require('../styles/reast.css');
require('../styles/style.css');
require('../fonts/iconfont.css');
import React, { Component } from 'react';
import { Router, IndexRoute, Route, Redirect, hashHistory } from 'react-router';

import LoginMobile from './loginMobile';//登录框
import BackPwd from './BackPwd';//修改密码
import BackCode from './BackCode';//修改密码，手机号生成二维码
import BackPwdSuccess from './BackPwdSuccess';//修改密码成功
import Register from './register';//注册
import weCode from './weCode';//二维码登录与注册
import weCodeNew from './loadCodeNew';//用作官网通信
import PwdLogin from './PwdLogin';//密码登录
import CodeLogin from './CodeLogin';//验证码登录，好像没用
import RegisterSuccess from './RegisterSuccess';//注册成功

import Index from './index';//上导航
import IndexMain from './indexMain';//首页
import CourseGrad from './CourseGrad';//学员定级

import LessonList from './MyLessonMain';//课表
import ScheduleDtail from './ScheduleDtail' //课表详情-已结束
import ScheduleDtailNo from './ScheduleDtailNo' //课表详情-未完成
import LessonUdone from './LessonUdone';//进入教室
import LessonUdoneReact from './LessonUdoneReact';//进入教室
import LessonCompleted from './LessonCompleted';
import LessonCompletedReact from './LessonCompletedReact';
import DeviceTesting from './DeviceTesting';//设备检测
import OrderLesson from './OrderLesson';//约课
import StudyCenter from './StudyCenter';//左侧导航-学习中心
import PersonCenter from './PersonCenter';//左侧导航-个人中心
import OrderLessonDetail from './orderLessonDetail';//预约详情
import PersonMyOrder from './personMyOrder';


import OrderModal from './Alert';//预约课程表
import OrderModalSuccess from './AlertSuccess';//预约成功
import MyLessonTime from './MyLessonTime';//我的课时
import MyOrder from './MyOrder';//我的订单
import PersonInfo from './PersonInfo'; //个人信息
import MyJiFen from './MyjiFen'; //我的积分
import YouHuiJuan from './YouHuiJuan';
import PinJia from './dingdan';
import DingJi from './MianCopy';
import DeviceTestingZD from './DestingZd';


class AppComponent extends Component {
  render() {
    return (
      <Router history={hashHistory}>
        <Route exact path="/" component={LoginMobile}>
          <IndexRoute component={weCode}></IndexRoute>
          <Route path="/Register" component={Register} />
          <Route path="/PwdLogin" component={PwdLogin} />
          <Route path="/CodeLogin" component={CodeLogin} />
          <Route path="/RegSuccess" component={RegisterSuccess} />
          <Route path="/BackPwd/:random" component={BackPwd} />
          <Route path="/BackCode" component={BackCode} />
          <Route path="/BackPwdSuccess" component={BackPwdSuccess} />
        </Route>
        <Route path="/Main" component={Index}>
          <IndexRoute component={IndexMain}></IndexRoute>
          <Route path="/Main/Person" component={PersonCenter} >
            <IndexRoute component={PersonInfo} />
            <Route path="/Main/Person/PersonInfo" component={PersonInfo} />
            <Route path="/Main/Person/MyLessonTime" component={MyLessonTime} />
            <Route path="/Main/Person/MyOrder" component={MyOrder} />
            <Route path="/Main/Person/Integrai" component={MyJiFen} />
            <Route path="/Main/Person/Discount" component={YouHuiJuan} />            
          </Route>
          <Route path="/Main/BuyLesson" component={OrderLesson} />
          <Route path="/Main/Index" component={StudyCenter}>
            <IndexRoute component={IndexMain} />
            <Route path="/Main/Index/Index" component={IndexMain} />
            <Route path="/Main/Index/YueLesson" component={OrderLesson} />
            <Route path="/Main/Index/LessonDetail" component={OrderLessonDetail} />
            <Route path="/Main/Index/OrderAlert" component={OrderModal} />
            <Route path="/Main/Index/OrderAlertSuccess" component={OrderModalSuccess} />
            <Route path="/Main/Index/PinJia" component={PinJia} />
            <Route path="/Main/Index/LessonList" component={LessonUdoneReact} > 
              <IndexRoute component={LessonUdoneReact}></IndexRoute>
              <Route path="/Main/Index/LessonList/Completed" component={LessonCompleted} />              
              <Route path="/Main/Index/LessonList/Undone" component={LessonUdone} />              
            </Route>
            <Route path="/Main/Index/LessonList/CompletedReact" component={LessonCompletedReact} />
            <Route path="/Main/Index/LessonList/UndoneReact" component={LessonUdoneReact} />
            <Route path="/Main/Index/ScheduleDtail/:id" component={ScheduleDtail} />
            <Route path="/Main/Index/ScheduleDtailNo/:id" component={ScheduleDtailNo} />
            <Route path="/Main/Index/Check" component={DeviceTesting} />
            <Route path="/Main/Index/CheckZd" component={DeviceTestingZD} />
            <Route path="/Main/Index/CourseGrad" component={CourseGrad} />
          </Route>
        </Route>
        <Route path="/loadCodeNew" component={weCodeNew} />
      </Router>
    );
  }
}

AppComponent.defaultProps = {
};

export default AppComponent;

