import React, { useState } from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { actionCreators as addPinCreators } from "../redux/modules/addpin";
import { Button, Flex, Avatar } from "../elements";

const AddPin = ({ history }) => {
    const [imgBase64, setImgBase64] = useState(""); // 파일 base64
    const [imgFile, setImgFile] = useState(null); //파일
    const [uploadedfile, setUploadedfile] = useState(""); //업로드한 파일
    const [title, setTitle] = useState("");
    const [imgDes, setImgDes] = useState(""); // 업로드한 파일 설명
    const name = localStorage.getItem("user_name");

    const dispatch = useDispatch();

    const SubmitAddPin = () => {
        const formData = new FormData();
        formData.append("title", title);
        formData.append("desc", imgDes);
        formData.append("image", imgFile);

        dispatch(addPinCreators.addPinAPI(formData));
    };

    const fileChangeHandler = (e) => {
        const files = e.target.files;
        setUploadedfile(files[0]);
    };

    const titleChangeHandler = (e) => {
        const newTitle = e.target.value;
        setTitle(newTitle);
    };

    const desChangeHandler = (e) => {
        const description = e.target.value;
        setImgDes(description);
    };

    //업로드한 사진 미리 보여주는 함수
    const handleChangeFile = (event) => {
        event.preventDefault();
        let reader = new FileReader();
        reader.onloadend = () => {
            // 2. 읽기가 완료되면 아래코드가 실행
            const base64 = reader.result;
            if (base64) {
                setImgBase64(base64.toString()); // 파일 base64 상태 업데이트
            }
        };
        if (event.target.files[0]) {
            reader.readAsDataURL(event.target.files[0]); // 1. 파일을 읽어 버퍼에 저장
            setImgFile(event.target.files[0]); // 파일 상태 업데이트
        }
    };
    //TextArea 글자 수에 따라 입력창이 늘어나는 함수
    const Resizing = (e) => {
        e.style.height = "auto";
        e.style.height = e.scrollHeight + "px";
    };

    return (
        <>
            <Background>
                <MainWrapper>
                    <Bottom>
                        <LeftSide>
                            <UploaderWrapper
                                onChange={handleChangeFile}
                                name="uploadedImg"
                                id="uploadedImg"
                                type="file"
                                accept="image/bmp,image/gif,image/jpeg,image/png,image/tiff,image/webp"
                            >
                                {imgBase64 ? (
                                    <Preview>
                                        <img
                                            src={imgBase64}
                                            alt="imagepreview"
                                            // onClick={setImgBase64(null)}
                                        />
                                    </Preview>
                                ) : null}
                                <InsideUploader>
                                    <IconWrap>
                                        <svg>
                                            <path d="M24 12c0-6.627-5.372-12-12-12C5.373 0 0 5.373 0 12s5.373 12 12 12c6.628 0 12-5.373 12-12zm-10.767 3.75a1.25 1.25 0 0 1-2.5 0v-3.948l-1.031 1.031a1.25 1.25 0 0 1-1.768-1.768L12 7l4.066 4.065a1.25 1.25 0 0 1-1.768 1.768l-1.065-1.065v3.982z"></path>
                                        </svg>
                                    </IconWrap>
                                    <Advice>드래그하거나 클릭하여 업로드</Advice>
                                    <Suggestion>
                                        권장사항 : 20MB 이하 고화질 .jpg파일
                                    </Suggestion>
                                    <Uploader
                                        id="ImageUploader"
                                        onChange={fileChangeHandler}
                                        type="file"
                                        accept="image/bmp,image/gif,image/jpeg,image/png,image/tiff,image/webp"
                                    ></Uploader>
                                </InsideUploader>
                            </UploaderWrapper>
                        </LeftSide>
                        <RightSide>
                            <Editor>
                                <Flex width="100">
                                    <Button
                                        className="saveBtn"
                                        width="64px"
                                        font_size="16px"
                                        font_weight="700"
                                        color="white"
                                        background_color="red"
                                        border_radius="10px"
                                        margin="0px 0px 0px 380px"
                                        border="none"
                                        _onClick={SubmitAddPin}
                                    >
                                        저장
                                    </Button>
                                </Flex>
                                <MakeTitle
                                    type="text"
                                    placeholder="제목 추가"
                                    maxlength="100"
                                    rows="1"
                                    onKeyDown={(e) => Resizing(e.target)}
                                    onChange={titleChangeHandler}
                                />
                                <div>
                                    <Avatar fontSize="1.5rem">
                                        {name.slice(0, 1).toUpperCase()}
                                    </Avatar>
                                </div>
                                <Description
                                    type="text"
                                    placeholder="사람들에게 회원님의 핀에 대해 설명해보세요"
                                    maxlength="500"
                                    rows="1"
                                    onKeyDown={(e) => Resizing(e.target)}
                                    onChange={desChangeHandler}
                                />
                            </Editor>
                        </RightSide>
                    </Bottom>
                </MainWrapper>
            </Background>
        </>
    );
};

export default AddPin;

const Background = styled.div`
    position: relative;
    height: 100vh;
    background-color: #efefef;
`;

const MainWrapper = styled.div`
    width: 880px;
    padding-top: 20px;
    position: absolute;
    background-color: #fff;
    top: 20px;
    left: 50%;
    height: auto;
    transform: translate(-50%, 10%);
    border-radius: 16px;

    ${({ theme }) => theme.device.desktop} {
        width: 750px;
    }

    ${({ theme }) => theme.device.tablet} {
        width: 600px;
    }

    ${({ theme }) => theme.device.mobile} {
        width: 350px;
    }
`;

const Bottom = styled.div`
    display: flex;
`;

const LeftSide = styled.div`
    margin: 10px 30px 20px;
    width: 100%;
`;

const Uploader = styled.input`
    height: 100%;
    opacity: 0;
    position: absolute;
    width: 100%;
    left: 0px;
    top: 0px;
    font-size: 0px;
    height: 100%;

    ${({ theme }) => theme.device.mobile} {
        display: none;
    }
`;

const Preview = styled.div`
    top: 0;
    left: 0;
    z-index: 700;
    position: absolute;
    border-radius: 8px;
    width: 100%;
    height: 100%;
    img {
        width: 100%;
        height: 100%;
        border-radius: 8px;
    }
`;

const UploaderWrapper = styled.div`
    background-color: rgb(239, 239, 239);
    box-shadow: none;
    width: 100%;
    border-radius: 8px;
    padding: 15px;
    height: 510px;
    cursor: pointer;
    position: relative;

    ${({ theme }) => theme.device.tablet} {
        height: 350px;
    }

    ${({ theme }) => theme.device.mobile} {
        height: 300px;
    }
`;

const InsideUploader = styled.div`
    position: relative;
    border: 2px dashed rgb(218, 218, 218);
    border-radius: 6px;
    height: 100%;
    width: 100%;
    cursor: pointer;
`;

const IconWrap = styled.div`
    position: absolute;
    top: 50%;
    left: 50%;
    transition: (-50%, -40%);
    display: block;
    padding: 1px;
    svg {
        color: #767676;
        width: 48px;
        height: 48px;

        path {
            fill: currentColor;
        }
    }

    ${({ theme }) => theme.device.tablet} {
        display: none;
    }
`;

const Advice = styled.div`
    text-align: center;
    font-size: 16px;
    font-weight: 400;
    width: 100%;
    padding: auto 48px;
    position: absolute;
    top: 60%;

    ${({ theme }) => theme.device.mobile} {
        display: none;
    }
`;

const Suggestion = styled.div`
    font-size: 14px;
    font-weight: 400;
    text-align: center;
    color: #767676;
    margin: auto;
    position: absolute;
    bottom: 15px;
    width: 100%;

    ${({ theme }) => theme.device.desktop} {
    }

    ${({ theme }) => theme.device.tablet} {
    }

    ${({ theme }) => theme.device.mobile} {
        display: none;
    }
`;

const RightSide = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    margin: 0 30px 0 10px;
    position: relative;
`;
const Editor = styled.div`
    div {
        display: flex;
        margin: 20px 0;
    }

    strong {
        display: flex;
        font-size: 16px;
        font-weight: 600;
        padding: auto;
        height: 100%;
        margin: auto 0;
        margin-left: 10px;
    }

    & .saveBtn {
        ${({ theme }) => theme.device.desktop} {
            width: 60px;
            height: 40px;
            font-size: 13px;
            margin: 0px 0px 0px 300px;
        }

        ${({ theme }) => theme.device.tablet} {
            width: 55px;
            height: 30px;
            font-size: 10px;
            margin: 0px 0px 0px 250px;
        }

        ${({ theme }) => theme.device.mobile} {
            margin: 0px 0px 0px 150px;
        }
    }
`;

const MakeTitle = styled.textarea`
    border: none;
    border-bottom: 1px solid rgba(142, 142, 142, 0.5);
    padding: 10px;
    margin-top: 40px;
    font-size: 36px;
    font-weight: 700;
    color: #333;
    caret-color: #333;
    overflow: auto;
    outline: 0px none transparent;
    overflow: auto;
    resize: none;
    &:focus {
        border-bottom: 1.5px solid rgb(0, 116, 232);
    }

    ${({ theme }) => theme.device.desktop} {
        font-size: 30px;
    }

    ${({ theme }) => theme.device.tablet} {
        font-size: 25px;
    }

    ${({ theme }) => theme.device.mobile} {
        font-size: 15px;
    }
`;

const Description = styled.textarea`
    width: 500px;
    border: none;
    border-bottom: 1px solid rgba(142, 142, 142, 0.5);
    /* white-space: pre-wrap; */
    font-size: 18px;
    color: #333;
    outline: 0px none transparent;
    overflow: auto;
    resize: none;
    padding: 10px;
    box-sizing: border-box;
    &:focus {
        border-bottom: 1.5px solid rgb(0, 116, 232);
    }

    ${({ theme }) => theme.device.desktop} {
        width: 350px;
        font-size: 13px;
    }

    ${({ theme }) => theme.device.tablet} {
        width: 320px;
    }

    ${({ theme }) => theme.device.mobile} {
        width: 230px;
        font-size: 8px;
    }
`;
