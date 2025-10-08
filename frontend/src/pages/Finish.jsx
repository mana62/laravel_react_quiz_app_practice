import { Link } from "react-router-dom"
import { ROUTES } from "../const";
import { Title } from "../components/TITLE/Title";
import styles from "./Question.module.css"

export function Finish() {
    return (
        <div>
            <Title>クイズ終了！</Title>
            <div>
                <Link className={styles.link} to={ROUTES.QUESTION}>再挑戦する</Link>
            </div>
        </div>
    )
}