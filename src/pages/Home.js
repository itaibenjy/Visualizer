import { MDBContainer } from "mdb-react-ui-kit";
import ScreenshotSorting from "../assets/images/Screenshot-Sorting.png"
import ScreenshotPathfinding from "../assets/images/Screenshot-Pathfinding.png"
import CV from "../assets/CV.pdf"



/**
 * Renders the Home page of the Visualizer app, which is a personal project of the author to explore algorithms and programming.
 * The page includes a brief introduction of the author's journey in algorithms, visualizations of sorting and pathfinding algorithms, and a call to action for job opportunities and collaboration.
 * @returns {JSX.Element} The Home page component.
 */
export default function Home() {

    return (<div className="pageContainer">
        <MDBContainer>
            <div className="row flex-lg-row align-items-center justify-content-center g-5 py-5">
                <div className="col-lg-6">
                    <h1 className="display-5 fw-bold lh-1 mb-4">Welcome to Visualizer</h1>
                    <h3 className="fw-bold lh-1 my-3" style={{fontFamily: "Monomania"}}> My Personal Exploration into Algorithms and Programming</h3>
                    <p className="lead my-2">
                        Programming, at its core, is about learning, problem-solving, and continuous growth. As a Software Engineering student, I started Visualizer as a personal project to help me better understand and appreciate the intricacies of algorithms.
                    </p>
                    <p className="lead my-2">
                        Here, I share my ongoing learning journey with you, visualizing algorithms in a way that makes them more approachable and comprehensible.
                    </p>
                    <div className="d-grid gap-2 d-md-flex justify-content-md-start">
                    </div>
                </div>
                <MDBContainer fluid className="col-10 col-sm-8 col-lg-6">
                    <img src={ScreenshotSorting} className="d-block mx-auto img-fluid" alt="Bootstrap Themes" width="700" height="500" loading="lazy" style={{borderRadius:"10px"}}/>
                </MDBContainer>
            </div>
        </MDBContainer>
        <MDBContainer>
            <div className="row flex-lg-row-reverse align-items-center justify-content-center g-5 py-5">
                <div className="col-lg-6">
                    <h3 className="fw-bold lh-1 my-3" style={{fontFamily: "Monomania"}}> My Journey in Algorithms</h3>
                    <p className="lead my-2">
                        My journey into the world of algorithms has been a thrilling one, starting from Sudoku and Sorting algorithms and transforming them into interactive visualizations. Using React, I've been able to demystify these complex algorithms, significantly improving my coding skills in the process. This ongoing expedition continues to reveal new lessons and insights.
                    </p>
                    <h3 className="fw-bold lh-1 mb-3 mt-5" style={{fontFamily: "Monomania"}}>Current Adventures</h3>
                    <p className="lead my-2">
                    I have now embarked on the intriguing path of Pathfinding Algorithms, commencing with the A* Search and Breadth-First Search (BFS). As I dive deeper into this fascinating realm, I am eagerly sharing my progress and discoveries. Stay tuned for a detailed exploration of these techniques and more exciting revelations to come!
                    </p>
                    <div className="d-grid gap-2 d-md-flex justify-content-md-start">
                    </div>
                </div>
                <MDBContainer fluid className="col-10 col-sm-8 col-lg-6">
                    <img src={ScreenshotPathfinding} className="d-block mx-auto img-fluid" alt="Bootstrap Themes" style={{maxHeight:"550px", borderRadius:"10px"}} loading="lazy" />
                </MDBContainer>
            </div>
        </MDBContainer>

        <MDBContainer className="my-4">
            <div className="row flex-lg-row-reverse align-items-center justify-content-center g-5 py-5">
                    <h3 className="fw-bold lh-1 my-3 mx-10 text-center" style={{fontFamily: "Monomania"}}> Hi there, I'm Itai Benjamin, a budding programmer on a mission to enhance my understanding of algorithms and React.</h3>
                    <p className="lead my-2 mx-auto text-center">
                       As much as Visualizer is about my personal exploration, it's also a demonstration of my skills and passion for Software Engineering. Currently, I'm on the lookout for new job opportunities that will allow me to grow and contribute.
                    </p>
                    <p className="lead my-2 mx-5 text-center">
                        As I navigate through this vast sea of computational logic, I'll keep adding more to this collection.If you're interested in my work and have an opening in your organization, or simply want to discuss algorithms and programming, I would be thrilled to connect with you. Let's make something great together!
                    </p>
                    <p className="lead my-2 mx-5 text-center">
                        Feel free to share your thoughts, suggestions, and questions. Together, we can make algorithm learning a more engaging and collaborative adventure!Please feel free to reach out to me at itaibenjy@gmail.com. You can also find more about my professional background on my <a href="https://www.linkedin.com/in/itai-benjamin-66696b250"> LinkedIn Profile </a>.
                    </p>
                    <p className="lead my-2 mx-5 text-center">
                        For your convenience, you can also <a href={CV} download="Itai Benjamin Resume"> Download My Resume.</a>
                    </p>
            </div>
        </MDBContainer>
        </div>)
}