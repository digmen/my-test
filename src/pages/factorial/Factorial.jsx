import React from "react";
import './factorial.css'


export default function Factorial() {
    const [inputValue, setInputValue] = React.useState("")
    const [message, setMessage] = React.useState("");
    const [answer, setAnswer] = React.useState("")

    function factorial() {
        const t = +inputValue;

        if (inputValue === "") {
            setAnswer('')
            return setMessage('Ведите число в поле ввода');
        } else if (Number.isFinite(t)) {
            setMessage(`${t} — это число`);
        } else {
            return setMessage(`${inputValue} — это не число`);
        }

        if (t <= 0) {
            setAnswer('')
            return setMessage('Чилсло меньше 1');
        } else {
            let res = 1
            for (let i = 1; i <= t; i++) {
                res *= i
            }
            setAnswer(res)
        }
    }


    return (
        <div>
            <div className='center'>
                <h1>Факториал числа</h1>
                <form onSubmit={(e) => e.preventDefault()}>
                    <input
                        className="form_input"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        required
                    />
                    <button type="button" onClick={() => factorial()}>Кнопка</button>
                </form>
                <p>{message}</p>
                <span>{answer}</span>
            </div>
        </div>
    );
}
