import React from "react";

import { Form, Input } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { useSigInSignUpContext } from "../../screens/SignInSignUp/SignInSignUpContext";

const BasicForm = (props) => {
  const MSG_USER_NOT_FOUND="user not found";
  const MSG_USER_NAME_REQUIRED="Please input your Username!";
  const MSG_PASSWORD_REQUIRED="Please input your Password";
  

  const onFinish = (values) => {
    console.log("Received values of form: ", values);
  };
  const validateMessages={
    types:{
      email:"not a valid email",
      number:"is not a valid number"
    }
      

  };
  let inputTimer = null;
  const {
    isSignIn,
    isPassInpHidden,
    onInpUsrName,
    userNameRef,
    passwordRef,
    isUserFound
  } = useSigInSignUpContext();
  console.log(isUserFound);
  return (
    <Form
      name="normal_login"
      initialValues={{
        remember: true,
      }}
      style={{ width: "100%", textAlign: "center" }}
      onFinish={onFinish}
    >
      <Form.Item
        name="username"
        hasFeedback
        help={isUserFound?null:MSG_USER_NOT_FOUND}
        
        rules={[
          {
            required: true,
            message:MSG_USER_NAME_REQUIRED 
          },
        ]}
      >
        <Input
          prefix={<UserOutlined className="site-form-item-icon" />}
          placeholder="Username"
          ref={userNameRef}
          onInput={(event)=>{
            let lastEvent={...event};
            clearTimeout(inputTimer);
            inputTimer=setTimeout(()=>{onInpUsrName(lastEvent)},300);
          }}
        />
      </Form.Item>
      <Form.Item
        hidden={isSignIn && isPassInpHidden}
        name="password"
        rules={[
          {
            required: true,
            message: MSG_PASSWORD_REQUIRED,
          },
        ]}
      >
        <Input
          ref={passwordRef}
          prefix={<LockOutlined className="site-form-item-icon" />}
          type="password"
          placeholder="Password"
        />
      </Form.Item>
      {props.children}
    </Form>
  );
};

export default BasicForm;
