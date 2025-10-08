import { questions } from "../data/questions";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Title } from "../components/TITLE/Title";
import styles from "./Question.module.css"

export function Question() {
    // ページ遷移するための関数。navigate("/finish") のように使える。
    const navigate = useNavigate();
    // 今表示している問題番号（配列のインデックス）。初期値は 0（最初の問題）。
    const [current, setCurrent] = useState(0);
    // 実際に表示する問題の配列を保存する。
    const [quizQuestions, setQuizQuestions] = useState([]);

    // ランダムに質問を出す
    useEffect(() => {
        // (.slice(0, 5))：上から 5 個だけ取得する。
        const shuffled = [...questions].sort(() => Math.random() - 0.5);
        setQuizQuestions(shuffled.slice(0, 5));
    }, []);

    // 問題がまだセットされていないときに「Loading...」を表示する。
    if(quizQuestions.length === 0) return <div>Loading...</div>;

    const q = quizQuestions[current];

    // index:クリックした選択肢の番号（配列のインデックス）
    const handleChoice = (index) => {
        if (index === q.answer) {
            alert("正解！");
        } else {
            alert("不正解…");
        }

    // 次の問題に進む
    if (current + 1 < quizQuestions.length) {
        setCurrent(current + 1);
    } else {
        navigate("/finish");// 最後の問題の場合はfinishへ
        }
    };

    return (
        <div>
            <Title>{q.question}</Title>
                <ul className={styles.ul}>
                    {q.choices.map((choice, index) => (
                        <li className={styles.li} key={index} onClick={() => handleChoice(index)}>
                            {choice}
                        </li>
                    ))}
                </ul>
        </div>
        );
    }