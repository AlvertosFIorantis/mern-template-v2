import React from "react";
import "./Dashboard.css";
import Settings from "../../icons/Settings";
import PlusSign from "../../icons/PlusSign";
import ProjectIcon from "../../icons/ProjectIcon";
import BookCover from "../../icons/BookCover";
import ThreeDots from "../../icons/ThreeDots";

function Dashboard() {
  return (
    <div class="wrapper">
      <section class="section">
        <header class="section__header">
          <h2 class="section__title">Projects</h2>
          <div class="section__control">
            <button
              class="section__button focus--box-shadow"
              type="button"
              aria-label="Filter projects"
            >
              <Settings />
            </button>
            <button
              class="section__button section__button--painted focus--box-shadow"
              type="button"
              aria-label="Add New project"
            >
              <PlusSign />
            </button>
          </div>
        </header>
        <ul class="project">
          <li class="project__item">
            <a href="#" class="project__link focus--box-shadow">
              <div class="project__wrapper">
                <div class="project__element project__icon">
                  <div
                    class="icon icon--viking"
                    aria-label="Icon of the 'Showcase Design' project"
                  >
                    <ProjectIcon />
                  </div>
                </div>
                <div class="project__element project__inform">
                  <span class="project__inform-name">Product presentation</span>
                </div>
                <div class="project__element project__photo">
                  <ul class="photo">
                    <li class="photo__item">
                      <span class="photo__substrate">+2</span>
                    </li>
                    <li class="photo__item">
                      {/* <img src="" alt="Jack's photo" /> */}
                    </li>
                    <li class="photo__item">
                      {/* <img src="" alt="Jessica's photo" /> */}
                    </li>
                  </ul>
                </div>
                <div class="project__element project__date">
                  <time class="date" datetime="2020-05-05T10:00:00">
                    05 May, 2020
                  </time>
                </div>
                <div class="project__element project__status">
                  <span class="status status--published">Published</span>
                </div>
                <div class="project__element project__setting">
                  <button
                    class="setting setting--rotate focus--box-shadow"
                    type="button"
                  >
                    <ThreeDots
                      view_Box="0 0 515.555 515.555"
                      enable_background={"new 0 0 515.555 515.555"}
                      svg_height={"512"}
                      svg_width={"512"}
                    />
                  </button>
                </div>
              </div>
            </a>
          </li>
          <li class="project__item">
            <a href="#" class="project__link focus--box-shadow">
              <div class="project__wrapper">
                <div class="project__element project__icon">
                  <div
                    class="icon icon--rajah"
                    aria-label="Icon for the project 'Book cover design'"
                  >
                    <BookCover />
                  </div>
                </div>
                <div class="project__element project__inform">
                  <span class="project__inform-name">Book cover design</span>
                </div>
                <div class="project__element project__photo">
                  <ul class="photo">
                    <li class="photo__item">
                      {/* <img src="" alt="Jessica's photo" /> */}
                    </li>
                  </ul>
                </div>
                <div class="project__element project__date">
                  <time class="date" datetime="2020-05-05T10:00:00">
                    13 February, 2020
                  </time>
                </div>
                <div class="project__element project__status">
                  <span class="status status--published">Published</span>
                </div>
                <div class="project__element project__setting">
                  <button
                    class="setting setting--rotate focus--box-shadow"
                    type="button"
                  >
                    <ThreeDots
                      view_Box="0 0 515.555 515.555"
                      enable_background={"new 0 0 515.555 515.555"}
                      svg_height={"512"}
                      svg_width={"512"}
                    />
                  </button>
                </div>
              </div>
            </a>
          </li>
          <li class="project__item">
            <a href="#" class="project__link focus--box-shadow">
              <div class="project__wrapper">
                <div class="project__element project__icon">
                  <div
                    class="icon icon--viking"
                    aria-label="Icon for the project 'Book cover design'"
                  >
                    <ProjectIcon />
                  </div>
                </div>
                <div class="project__element project__inform">
                  <span class="project__inform-name">
                    Logo redesign for eyeglass store
                  </span>
                </div>
                <div class="project__element project__photo">
                  <ul class="photo">
                    <li class="photo__item">
                      {/* <img src="" alt="Jessica's photo" /> */}
                    </li>
                  </ul>
                </div>
                <div class="project__element project__date">
                  <time class="date" datetime="2020-05-05T10:00:00">
                    01 February, 2020
                  </time>
                </div>
                <div class="project__element project__status">
                  <span class="status status--in-work">In work</span>
                </div>
                <div class="project__element project__setting">
                  <button
                    class="setting setting--rotate focus--box-shadow"
                    type="button"
                  >
                    <ThreeDots
                      view_Box="0 0 515.555 515.555"
                      enable_background={"new 0 0 515.555 515.555"}
                      svg_height={"512"}
                      svg_width={"512"}
                    />
                  </button>
                </div>
              </div>
            </a>
          </li>
        </ul>
      </section>
    </div>
  );
}

export default Dashboard;
