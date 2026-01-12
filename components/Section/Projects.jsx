import Section from "../Util/Section";
import Row from "../Util/Row";
import {
  projectsDiv,
  projectsRow
} from "../../stylesheets/components/Section/Projects.module.sass";
import ProjectCard from "../ProjectCard";
import BlogShowcaseButton from "../BlogShowcase/BlogShowcaseButton";
import { BLOG_LINK } from "../../utils/Constants.utils";
import blogShowcase from "../../data/blogShowcase.json";

const projects = require("../../data/projects.json");

const Projects = () => (
  <Section>
    <div className={projectsDiv}>
      <Row className={projectsRow}>
        {projects.projectList.map((project) => (
          <ProjectCard
            imageLink={project.imageLink}
            imageAlt={project.imageAlt}
            title={project.title}
            subtitle={project.subtitle}
            text={project.text}
            blogPost={project.blogPost}
            key={project.title}
          />
        ))}
      </Row>
      <BlogShowcaseButton
        link={BLOG_LINK}
        text={blogShowcase.viewAllBlogPostsButton}
      />
    </div>
  </Section>
);

export default Projects;
