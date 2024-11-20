import cn from "../style.module.css";

const Abduvoxit = () => {
  return (
    <div className={cn.aboutPage}>
      <h1>Abduvoxit</h1>
      <p>Привет! Я Abduvoxit, веб-разработчик с опытом в создании современных и эффективных приложений.</p>

      <h2>Навыки:</h2>
      <ul>
        <li>JavaScript (React, Node.js)</li>
        <li>HTML, CSS (Sass, Bootstrap)</li>
        <li>Работа с базами данных (MongoDB, MySQL)</li>
      </ul>

      <h2>Контакты:</h2>
      <ul className={cn.socialLinks}>
        <li>
          <a href="https://linkedin.com/in/yourprofile" target="_blank" rel="noopener noreferrer">LinkedIn</a>
        </li>
        <li>
          <a href="https://github.com/yourprofile" target="_blank" rel="noopener noreferrer">GitHub</a>
        </li>
        <li>
          <a href="mailto:your.email@example.com">Email</a>
        </li>
      </ul>

      <h2>Обо мне:</h2>
      <p>Я люблю разрабатывать креативные и функциональные веб-решения. Моя цель — создавать продукты, которые улучшают пользовательский опыт и решают реальные задачи.</p>
    </div>
  );
}

export default Abduvoxit;
