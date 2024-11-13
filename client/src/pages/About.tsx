import abduvoxit from '../assets/photo_2023-02-21_17-43-26.jpg';
import jasur from '../assets/photo_2023-04-22_10-55-11.jpg';

export function About() {
    return (
        <>
            <div className="container">
                <h1 className="text-center">О нас</h1>
                <p className="text-center mb-5">
                    Этот сайт был разработан двумя разработчиками за одну неделю. Мы посвятили
                    много времени и усилий, чтобы создать удобный и функциональный ресурс,
                    который поможет вам решить ваши задачи.
                </p>
                
                <div className="row">
                    <div className="col-md-6 mb-4">
                        <div className="card shadow-sm">
                            <img
                                src={abduvoxit}
                                alt="Abduvoxit"
                                className="card-img-top"
                            />
                            <div className="card-body text-center">
                                <h3 className="card-title">Abduvoxit</h3>
                                <p className="card-text">
                                    Специалист по разработке сайтов с опытом в создании креативных и
                                    функциональных веб-решений. Работает с современными
                                    технологиями, чтобы удовлетворить любые нужды клиента.
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-6 mb-4">
                        <div className="card shadow-sm">
                            <img
                                src={jasur}
                                alt="Jasur"
                                className="card-img-top"
                            />
                            <div className="card-body text-center">
                                <h3 className="card-title">Jasur</h3>
                                <p className="card-text">
                                Имеет богатый опыт в создании динамичных и интерактивных веб-приложений. Специализируется на интеграции с базами данных и разработке серверной логики, обеспечивая надежность и масштабируемость проектов.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="text-center mt-5">
                    <h2>Цены на разработку сайтов</h2>
                    <p>
                        Мы предлагаем конкурентные цены на разработку сайтов в зависимости от
                        сложности и требований проекта. Свяжитесь с нами для получения
                        индивидуального предложения.
                    </p>
                </div>
            </div>
        </>
    );
}
