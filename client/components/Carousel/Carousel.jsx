import React from "react";
import "./carousel.css";

export const Carousel = () => {
  return (
    <div className="carousel-container">
      <h1 className="title-carousel">Reviews</h1>

      <div id="slideshow">
        <div className="slide-wrapper">
          {/* Slide 1 */}
          <div className="slide">
            <div className="card-cnt">
              <div className="comment-cnt">
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit...
                </p>
              </div>
              <div className="user-cnt">
                <div className="img-cnt">
                  <img src="/images/user444.avif" alt="Sara Baroti" />
                </div>
                <div className="name">
                  <span>Sara Baroti</span>
                </div>
              </div>
            </div>

            <div className="card-cnt">
              <div className="comment-cnt">
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit...
                </p>
              </div>
              <div className="user-cnt">
                <div className="img-cnt">
                  <img src="/images/user2.avif" alt="Ergi Lama" />
                </div>
                <div className="name">
                  <span>Ergi Lama</span>
                </div>
              </div>
            </div>

            <div className="card-cnt">
              <div className="comment-cnt">
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit...
                </p>
              </div>
              <div className="user-cnt">
                <div className="img-cnt">
                  <img src="/images/zevend.avif" alt="Ergis Fejza" />
                </div>
                <div className="name">
                  <span>Ergis Fejza</span>
                </div>
              </div>
            </div>
          </div>

          {/* Slide 2 */}
          <div className="slide">
            <div className="card-cnt">
              <div className="comment-cnt">
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit...
                </p>
              </div>
              <div className="user-cnt">
                <div className="img-cnt">
                  <img src="/images/userxhoana.avif" alt="Xhoi Gjoshi" />
                </div>
                <div className="name">
                  <span>Xhoi Gjoshi</span>
                </div>
              </div>
            </div>

            <div className="card-cnt">
              <div className="comment-cnt">
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit...
                </p>
              </div>
              <div className="user-cnt">
                <div className="img-cnt">
                  <img src="/images/usersedi.avif" alt="Edi Hoxha" />
                </div>
                <div className="name">
                  <span>Edi Hoxha</span>
                </div>
              </div>
            </div>

            <div className="card-cnt">
              <div className="comment-cnt">
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit...
                </p>
              </div>
              <div className="user-cnt">
                <div className="img-cnt">
                  <img src="/images/useranaaa.avif" alt="Ana Xhaferri" />
                </div>
                <div className="name">
                  <span>Ana Xhaferri</span>
                </div>
              </div>
            </div>
          </div>

          {/* Slide 3 */}
          <div className="slide">
            <div className="card-cnt">
              <div className="comment-cnt">
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit...
                </p>
              </div>
              <div className="user-cnt">
                <div className="img-cnt">
                  <img src="/images/user11111.avif" alt="Irdi Kola" />
                </div>
                <div className="name">
                  <span>Irdi Kola</span>
                </div>
              </div>
            </div>

            <div className="card-cnt">
              <div className="comment-cnt">
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit...
                </p>
              </div>
              <div className="user-cnt">
                <div className="img-cnt">
                  <img src="/images/userartann.avif" alt="Artan Plaku" />
                </div>
                <div className="name">
                  <span>Artan Plaku</span>
                </div>
              </div>
            </div>

            <div className="card-cnt">
              <div className="comment-cnt">
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit...
                </p>
              </div>
              <div className="user-cnt">
                <div className="img-cnt">
                  <img src="/images/useerigli.avif" alt="Igli Beqiri" />
                </div>
                <div className="name">
                  <span>Igli Beqiri</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
