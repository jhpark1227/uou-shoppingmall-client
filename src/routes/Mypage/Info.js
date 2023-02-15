import MypageBar from "./MypageBar";
import '../../css/Info.css';
import axios from "axios";
import { useEffect, useState } from "react";
import PhoneNumber from "./PhoneNumber";
import { useNavigate } from "react-router-dom";

const Info = () => {
    const uri = "http://localhost:3001/member_new";
    const [data,setData] = useState([]);
    const [loading,setLoading] = useState(false);
    const [newPW1,setNewPW1] = useState("");
    const [newPW2,setNewPW2] = useState("");
    const [a,setA] = useState("");
    const [b,setB] = useState("");
    const [c,setC] = useState("");
    const navigate = useNavigate();
    const getInfo =async() =>{
        const savedUsername = localStorage.getItem("username");
        await axios.get(uri)
        .then((response)=>{
            console.log("axios:",response.data);
            return(
                response.data
                )
            }).then((datas)=>datas.filter((data)=>data.email===savedUsername)).then((data)=>{
               if(data[0].phone_number){
                if(data[0].phone_number.length===13){
                    setA(data[0].phone_number.substr(0,3));
                    setB(data[0].phone_number.substr(4,4));
                    setC(data[0].phone_number.substr(9,4));
                }
                else if(data[0].phone_number.length===12){
                    setA(data[0].phone_number.substr(0,3));
                    setB(data[0].phone_number.substr(4,3));
                    setC(data[0].phone_number.substr(8,4));
                }
               }
                setData(data[0])})
        setLoading(true);
    }

    useEffect(()=>{
        getInfo(); 
    },[])

   
    const onPWHandler1 = (event) => {
        setNewPW1(event.target.value);
    }
    const onPWHandler2 = (event) => {
        setNewPW2(event.target.value);
    }
    
    const PNCheck = () =>{
        if(a.length===0&&b.length===0&&c.length===0){
            return true;
        }
        const RegExp1 = /^[0-9]{3}$/;
        const RegExp2 = /^[0-9]{3,4}$/;
        const RegExp3 = /^[0-9]{4}$/;
        if(RegExp1.test(a)&&RegExp2.test(b)&&RegExp3.test(c)){
          return true;
        }
        else return false
    }
    const PWCheck = () => {
        let RegExp =  /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&]{10,}$/;
        if(RegExp.test(newPW1))return true;
        else return false;
      }

    const saveClick = () => {
        if(!PNCheck())alert("휴대전화 번호를 정확하게 입력하세요");
        else if(!PWCheck()||(newPW1!==newPW2))alert("비밀번호를 정확하게 입력하세요");
        else if(PNCheck()&&PWCheck()&&(newPW1===newPW2)){
            let putData;
            if(a.length===0){
                putData = {
                    "address": data.address,
                    "email": data.email,
                    "name": data.name,
                    "password": newPW1,
                }
            }
           else{
                putData = {
                    "address": data.address,
                    "email": data.email,
                    "name": data.name,
                    "password": newPW1,
                    "phone_number":`${a}-${b}-${c}`,
                }
            }
            axios.put(`${uri}/${data.id}`,putData);
            console.log("good!");
            navigate("/");
        }
    }
    return (
        <>
            <MypageBar/>
            <div className="mypage_content">
                <h3>개인정보관리</h3>
                <div className="info_form">
                    <table>
                        <tbody>
                            <tr>
                                <th>이메일</th>
                                <td>{data.email}</td>
                            </tr>
                            <tr>
                                    <th>이름</th>
                                    <td>{data.name}</td>
                            </tr>
                            <tr>
                                    <th>휴대전화</th>
                                    <td>
                                       {loading?(<PhoneNumber data={data} a={a} b={b} c={c} setA={setA} setB={setB} setC={setC}/>):(<></>)}
                                    </td>
                            </tr>
                            <tr>
                                    <th>새 비밀번호</th>
                                    <td><input onChange={onPWHandler1}value={newPW1} type="password" placeholder="특수문자 포함 10자리 이상"/></td>
                            </tr>
                            <tr>
                                    <th>새 비밀번호 확인</th>
                                    <td><input onChange={onPWHandler2} value={newPW2} type="password" placeholder="비밀번호 확인"/></td>
                            </tr>
                        </tbody>
                    </table>
                    <div className="info_btn_wrap">
                        <div><a href="/mypage">취소</a></div>
                        <div onClick={saveClick} style={{color:"white", backgroundColor:"black"}}>저장</div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Info;