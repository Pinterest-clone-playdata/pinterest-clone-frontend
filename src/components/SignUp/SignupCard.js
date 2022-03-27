import React, { useState } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Pinterest } from "@material-ui/icons";
import { IconButton } from "@material-ui/core";
import { actionCreators as userActions } from "../../redux/modules/user";
import { Flex, Text, Button, Input } from "../../elements";
import { LoginForm } from "../";

const SignupCard = (props) => {
    const [loginMode, setLoginMode] = useState(true);
    const dispatch = useDispatch();
    const idCheck = useSelector((state) => state.user.is_id);
    const formik = useFormik({
        initialValues: {
            email: "",
            password: "",
            nickname: "",
        },

        validationSchema: Yup.object({
            email: Yup.string()
                .email("올바른 이메일 주소가 아닙니다.")
                .required("빠뜨린 부분이 있네요! 잊지 말고 이메일을 추가하세요."),
            password: Yup.string()
                .matches(/^(?=.*\d)(?=.*[a-zA-Z])[0-9a-zA-Z]{8,30}$/, "비밀번호는 영문 1자 이상, 숫자 1자 이상 포함시켜 주세요.")
                .required("비밀번호를 입력해주세요."),
            nickname: Yup.string()
                .matches(/^([a-zA-Z0-9ㄱ-ㅎ|ㅏ-ㅣ|가-힣]).{1,50}$/, "닉네임은 1글자 이상 50자 이하의 영문 또는 한글로 입력해 주세요")
                .required("닉네임을 입력해주세요"),
        }),

        onSubmit: (values) => {
            dispatch(userActions.signupAPI(values));
            setLoginMode(true);
        },
    });

    return (
        <Container>
            <Flex margin="10px 0">
                <IconButton color="red">
                    <Pinterest />
                </IconButton>
            </Flex>
            <Text font_size="2.2rem" margin="0px">
                Pinterest에 오신 것을 환영
            </Text>
            <Text font_size="2.2rem" margin="10px 0 10px 0">
                합니다.
            </Text>
            <Text size="1.6rem" margin="0 0 30px 0">
                시도해 볼 만한 새로운 아이디어 찾기
            </Text>
            {loginMode ? (
                <LoginForm />
            ) : (
                <form onSubmit={formik.handleSubmit}>
                    <Flex>
                        <Input
                            margin="5px 0"
                            width="268px"
                            height="40px"
                            name="email"
                            type="text"
                            _onChange={formik.handleChange}
                            value={formik.values.email}
                            placeholder="이메일"
                            _onBlur={(e) => {
                                // dispatch(userActions.loginActionAPI(e.target.value));
                            }}
                        />
                        {formik.touched.email && formik.errors.email ? (
                            <Text margin="5px 0" color="#e60023">
                                {formik.errors.email}
                            </Text>
                        ) : null}

                        <Input
                            margin="5px 0"
                            width="268px"
                            height="40px"
                            name="password"
                            type="password"
                            _onChange={formik.handleChange}
                            value={formik.values.password}
                            placeholder="비밀번호를 입력하세요"
                        />
                        {formik.touched.password && formik.errors.password ? (
                            <Text margin="5px 0" color="#e60023">
                                {formik.errors.password}
                            </Text>
                        ) : null}

                        <Input
                            margin="5px 0"
                            height="40px"
                            width="268px"
                            name="nickname"
                            type="text"
                            _onChange={formik.handleChange}
                            value={formik.values.nickname}
                            placeholder="닉네임을 입력해주세요"
                        />
                        {formik.touched.nickname && formik.errors.nickname ? (
                            <Text margin="5px 0" color="#e60023">
                                {formik.errors.nickname}
                            </Text>
                        ) : null}

                        <Button
                            type="submit"
                            width="268px"
                            height="40px"
                            background_color="#e60023"
                            border_radius="20px"
                            margin="10px 0 0 0"
                        >
                            계속하기
                        </Button>
                    </Flex>
                </form>
            )}
            <Text mg="20px 0" size="1.6rem">
                또는
            </Text>
            <Button
                width="268px"
                height="40px"
                border_radius="20px"
                background_color="blue"
                margin="5px 0"
            >
                Facebook으로 계속하기
            </Button>
            <Button
                width="268px"
                height="40px"
                margin="5px 0"
                border_radius="20px"
                background_color="white"
                color="black"
                border="1px solid"
            >
                Google으로 계속하기
            </Button>
            <Text font_size="11px" width="268px" mg="15px">
                계속 진행하면 Pinterest 서비스 약관에 동의하고 개인정보 보호정책을
                읽었음을 인정하는 것으로 간주됩니다.
            </Text>
            {loginMode ? (
                <Text
                    weight="700"
                    pointer
                    _onClick={() => {
                        setLoginMode(false);
                    }}
                >
                    아직 Pinterest를 사용하고 있지 않으신가요? 가입하기
                </Text>
            ) : (
                <Text
                    font_weight="700"
                    cursor="pointer"
                    _onClick={() => {
                        setLoginMode(true);
                    }}
                >
                    이미 회원이신가요? 로그인하기
                </Text>
            )}
            <GoBusiness>무료 Business 계정 만들기</GoBusiness>
        </Container>
    );
};
const GoBusiness = styled.div`
    background-color: gainsboro;
    position: absolute;
    font-size: 1.6rem;
    font-weight: 700;
    width: 100%;
    height: 80px;
    left: 0;
    bottom: 0;
    border-radius: 0 0 32px 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
`;

const Container = styled.section`
    background-color: #ffffff;
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
    width: 430px;
    height: 730px;
    box-shadow: rgba(0, 0, 0, 0.05) 0px 0px 0px 1px;
    border-radius: 32px;
    padding: 24px 10px 24px 10px;
`;

export default SignupCard;
