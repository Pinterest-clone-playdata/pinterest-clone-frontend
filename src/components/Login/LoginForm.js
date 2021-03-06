import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Text, Button, Input } from "../../elements";
import { actionCreators as userActions } from "../../redux/modules/user";

const LoginForm = () => {
    const dispatch = useDispatch();
    const loginName = useSelector((state) => state.user.loginId);
    const formik = useFormik({
        initialValues: {
            email: "",
            password: "",
        },

        validationSchema: Yup.object({
            email: Yup.string()
                .email("올바른 이메일 주소가 아닙니다.")
                .required("빠뜨린 부분이 있네요! 잊지 말고 이메일을 추가하세요."),
            password: Yup.string()
                .matches(/^(?=.*\d)(?=.*[a-zA-Z])[0-9a-zA-Z]{8,30}$/, "비밀번호는 8자 이상 30자 이하의 영문, 숫자를 모두 1자 이상 포함한 문자열입니다")
                .required("패스워드를 입력해주세요."),
        }),

        onSubmit: (values) => {
            dispatch(userActions.loginAPI(values));
        },
    });

    return (
        <form onSubmit={formik.handleSubmit}>
            <div>
                <Input
                    margin="5px 0"
                    width="268px"
                    height="40px"
                    name="email"
                    type="text"
                    _onChange={formik.handleChange}
                    value={formik.values.email}
                    placeholder="이메일을 입력하세요"
                />
                {formik.touched.email && formik.errors.email ? (
                    <Text margin="5px 0" color="#e60023">
                        {formik.errors.email}
                    </Text>
                ) : null}
            </div>
            <div>
                <Input
                    margin="5px 0"
                    width="268px"
                    name="password"
                    type="password"
                    height="40px"
                    _onChange={formik.handleChange}
                    value={formik.values.password}
                    placeholder="비밀번호를 입력하세요"
                />
                {formik.touched.password && formik.errors.password ? (
                    <Text margin="5px 0" color="#e60023">
                        {formik.errors.password}
                    </Text>
                ) : null}
            </div>
            <Text margin="20px 0" size="1.4rem" weight="500" pointer>
                비밀번호를 잊으셨나요?
            </Text>
            <Button
                type="submit"
                width="268px"
                height="40px"
                background_color="red"
                border_radius="20px"
            >
                로그인
            </Button>
        </form>
    );
};

export default LoginForm;
