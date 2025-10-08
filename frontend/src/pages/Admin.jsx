import { useEffect, useState } from "react";
import axios from "axios";
import { Title } from "../components/TITLE/Title";
import styles from "./Admin.module.css";

export function Admin() {
  // 取得したクイズの一覧を保存ｓる配列
  const [quizzes, setQuizzes] = useState([]);
  // データ取得中かどうかのフラグ
  const [loading, setLoading] = useState(true);
  // モーダル対象
  const [editingQuiz, setEditingQuiz] = useState(null);

  // クイズデータ取得(毎回ではなくuseEffectで初回のみ)
  useEffect(() => {
    axios.get("/api/admin/quizzes")
      .then(res => setQuizzes(res.data))
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  // 削除機能
  const handleDelete = async (id) => {
    if (!confirm("本当に削除しますか？")) return;
    // APIにアクセス
    await axios.delete(`/api/admin/quizzes/${id}`);
    // 成功したら、quizzes 配列から削除したクイズを取り除く
    setQuizzes(quizzes.filter(q => q.id !== id));
  };

  // 編集機能
  const handleEdit = (quiz) => {
    // 編集対象のクイズをコピーして editingQuiz にセット
    setEditingQuiz({...quiz});
  };

  // モーダル閉じる
  const handleCloseModal = () => {
    // 閉じたらモーダルはnull
    setEditingQuiz(null);
  };

  // 編集内容を保存
  const handleSave = async () => {
    try {
      // 編集のAPI [Axios のレスポンスオブジェクトには data というプロパティが標準で含まれている]
      const res = await axios.put(`/api/admin/quizzes/${editingQuiz.id}`, editingQuiz);
      // 編集したクイズと 同じID なら、更新後のデータ res.data に置き換える。それ以外はそのまま q を残す
      setQuizzes(quizzes.map(q => q.id === res.data.id ? res.data : q));
      setEditingQuiz(null);
    } catch (err) {
      console.error(err);
      alert("更新に失敗しました。");
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className={styles.container}>
      <Title>管理者ページ</Title>

      {quizzes.length === 0 ? (
        <p>まだクイズがありません。</p>
      ) : (
        <ul className={styles.quizList}>
          {quizzes.map((q) => (
            <li key={q.id} className={styles.quizItem}>
              <h3>{q.question}</h3>
              <ul>
                {q.choices.map((c) => (
                  <li key={c.id}>
                    {c.text} {c.is_correct ? "(正解)" : ""}
                  </li>
                ))}
              </ul>

              <div className={styles.buttonGroup}>
                <button className={styles.editButton} onClick={() => handleEdit(q)}>編集</button>
                <button className={styles.deleteButton}  onClick={() => handleDelete(q.id)}>削除</button>
              </div>
            </li>
          ))}
        </ul>
      )}

      {/* モーダル表示部分 */}
      {editingQuiz && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            <h3>クイズを編集</h3>
            <input
              type="text"
              value={editingQuiz.question}
              onChange={(e) => setEditingQuiz({ ...editingQuiz, question: e.target.value })}
              className={styles.input}
            />

            <h4>選択肢</h4>
            {editingQuiz.choices.map((c, index) => (
              <div key={index} className={styles.choiceItem}>
                <input
                  type="text"
                  value={c.text}
                  onChange={(e) => {
                    const updated = [...editingQuiz.choices];
                    updated[index].text = e.target.value;
                    setEditingQuiz({ ...editingQuiz, choices: updated });
                  }}
                />
                <label>
                  <input
                    type="checkbox"
                    checked={c.is_correct}
                    onChange={(e) => {
                      const updated = [...editingQuiz.choices];
                      updated[index].is_correct = e.target.checked;
                      setEditingQuiz({ ...editingQuiz, choices: updated });
                    }}
                  />
                  正解
                </label>
              </div>
            ))}

            <div className={styles.modalButtons}>
              <button onClick={handleSave}>更新</button>
              <button onClick={handleCloseModal}>キャンセル</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
