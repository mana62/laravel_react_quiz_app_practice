import { Link } from "react-router-dom";
import { ROUTES } from "../const";
import { Button } from "../components/BUTTON/Button"
import { Title } from "../components/TITLE/Title";
import styles from "./Question.module.css"

export function Home() {
    return (
        <>
            <Title>クイズ アプリ</Title>
            <Link to={ROUTES.QUESTION}>
                <Button>スタート</Button>
            </Link>
            <div>
                <Link
                className={styles.link}
                to={ROUTES.ADMIN}>
                管理者はこちら
            </Link>
            </div>
        </>
    )
}