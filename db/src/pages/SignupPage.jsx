import { useState } from "react";
import { useNavigate } from "react-router-dom"; // 수정
import InputField from "../components/InputField";

const SignupPage = () => {
  const navigate = useNavigate(); // 수정
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const isPasswordValid = (password) => {
    const lengthValid = password.length >= 8;
    const specialCharValid = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    return {
      lengthValid,
      specialCharValid,
      isValid: lengthValid && specialCharValid,
    };
  };

  const doPasswordsMatch = form.password === form.confirmPassword;
  const passwordCheck = isPasswordValid(form.password);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!passwordCheck.isValid) {
      alert("비밀번호 보안 조건을 확인하세요.");
      return;
    }

    if (!doPasswordsMatch) {
      alert("비밀번호가 일치하지 않습니다.");
      return;
    }

    try {
      const res = await fetch("/api/auth/signup", {
        // fetch 경로 바꾸지말기
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: form.email,
          password: form.password,
          name: form.name,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        alert("회원가입 성공! 로그인 페이지로 이동합니다.");
        navigate("/login"); // 수정
      } else {
        alert(data.error || "회원가입 실패");
      }
    } catch (error) {
      console.error("회원가입 오류:", error);
      alert("서버 오류가 발생했습니다.");
    }
  };

  return (
    <div className="w-screen h-screen bg-[#1e1e1e] text-white flex flex-col">
      <div className="px-10 pt-10">
        <div className="text-5xl font-roboto">
          <span className="text-blue-400 text-7xl">P</span>
          <span className="text-gray-400 text-3xl">roto</span>
          <span className="text-blue-400 text-7xl">S</span>
          <span className="text-gray-400 text-3xl">hare</span>
        </div>
      </div>

      <div className="flex flex-1 items-center justify-center">
        <form
          onSubmit={handleSubmit}
          className="bg-[#2a2a2a] p-12 rounded-2xl shadow-md w-[600px]"
        >
          <h2 className="text-4xl font-bold text-center mb-10">회원가입</h2>

          <InputField
            label="이름"
            name="name"
            type="text"
            value={form.name}
            onChange={handleChange}
            className="text-xl"
          />
          <InputField
            label="이메일"
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            placeholder="abc@example.com"
            className="text-xl"
          />
          <InputField
            label="비밀번호"
            name="password"
            type="password"
            value={form.password}
            onChange={handleChange}
            placeholder="********"
            className="text-xl"
          />

          {form.password && (
            <div className="text-lg mt-2 space-y-2">
              <p
                className={
                  passwordCheck.lengthValid ? "text-green-400" : "text-red-400"
                }
              >
                • 8자 이상
              </p>
              <p
                className={
                  passwordCheck.specialCharValid
                    ? "text-green-400"
                    : "text-red-400"
                }
              >
                • 특수문자 포함 (!@#$%^&*)
              </p>
            </div>
          )}

          <InputField
            label="비밀번호 확인"
            name="confirmPassword"
            type="password"
            value={form.confirmPassword}
            onChange={handleChange}
            placeholder="********"
            className="text-xl"
          />

          {form.confirmPassword && (
            <p
              className={`text-lg mt-2 ${
                doPasswordsMatch ? "text-green-400" : "text-red-400"
              }`}
            >
              {doPasswordsMatch
                ? "비밀번호가 일치합니다."
                : "비밀번호가 일치하지 않습니다."}
            </p>
          )}

          <button
            type="submit"
            disabled={!passwordCheck.isValid || !doPasswordsMatch}
            className={`w-full py-4 mt-6 rounded-lg font-bold text-xl ${
              passwordCheck.isValid && doPasswordsMatch
                ? "bg-blue-500 hover:bg-blue-600 text-white"
                : "bg-gray-600 text-gray-300 cursor-not-allowed"
            }`}
          >
            가입하기
          </button>

          <p className="text-lg text-center mt-6 text-gray-400">
            이미 계정이 있으신가요?{" "}
            <a href="/login" className="text-blue-400 underline">
              로그인
            </a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default SignupPage;
