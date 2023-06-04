import { MDBContainer } from "mdb-react-ui-kit";
import ScreenshotSorting from "../assets/images/Screenshot-Sorting.png"
import ScreenshotSudoku from "../assets/images/Screenshot-Sudoku.png"
import CV from "../assets/CV.pdf"



export default function Home() {

    return (<>
        <MDBContainer>
            <div class="row flex-lg-row align-items-center justify-content-center g-5 py-5">
                <div class="col-lg-6">
                    <h1 class="display-5 fw-bold lh-1 mb-4">Welcome to Visualizer</h1>
                    <h3 class="fw-bold lh-1 my-3" style={{fontFamily: "Monomania"}}> My Personal Exploration into Algorithms and Programming</h3>
                    <p class="lead my-2">
                        Programming, at its core, is about learning, problem-solving, and continuous growth. As a Software Engineering student, I started Visualizer as a personal project to help me better understand and appreciate the intricacies of algorithms.
                    </p>
                    <p class="lead my-2">
                        Here, I share my ongoing learning journey with you, visualizing algorithms in a way that makes them more approachable and comprehensible.
                    </p>
                    <div class="d-grid gap-2 d-md-flex justify-content-md-start">
                    </div>
                </div>
                <MDBContainer fluid class="col-10 col-sm-8 col-lg-6">
                    <img src={ScreenshotSorting} class="d-block mx-auto img-fluid" alt="Bootstrap Themes" width="700" height="500" loading="lazy" style={{borderRadius:"10px"}}/>
                </MDBContainer>
            </div>
        </MDBContainer>

        <MDBContainer>
            <div class="row flex-lg-row-reverse align-items-center justify-content-center g-5 py-5">
                <div class="col-lg-6">
                    <h3 class="fw-bold lh-1 my-3" style={{fontFamily: "Monomania"}}> My Progress So Far</h3>
                    <p class="lead my-2">
                        I've spent countless hours diving into the world of Sudoku and Sorting algorithms, turning them into interactive visualizations. Using React, I've not only been able to better understand these algorithms but also to improve my coding skills. This is an ongoing journey, and every step brings a new lesson.
                    </p>
                    <h3 class="fw-bold lh-1 mb-3 mt-5" style={{fontFamily: "Monomania"}}>What's on the Horizon?</h3>
                    <p class="lead my-2">
                       Next on my journey, I'm steering towards the labyrinth of Pathfinding Algorithms. From Dijkstra's Algorithm to A* Search, I'm excited to dig deeper and share my learning progress with you. Keep an eye out for my upcoming explorations!
                    </p>
                    <div class="d-grid gap-2 d-md-flex justify-content-md-start">
                    </div>
                </div>
                <MDBContainer fluid class="col-10 col-sm-8 col-lg-6">
                    <img src={ScreenshotSudoku} class="d-block mx-auto img-fluid" alt="Bootstrap Themes" style={{maxHeight:"550px", borderRadius:"10px"}} loading="lazy" />
                </MDBContainer>
            </div>
        </MDBContainer>
        <MDBContainer className="my-4">
            <div class="row flex-lg-row-reverse align-items-center justify-content-center g-5 py-5">
                    <h3 class="fw-bold lh-1 my-3 mx-10 text-center" style={{fontFamily: "Monomania"}}> Hi there, I'm Itai Benjamin, a budding programmer on a mission to enhance my understanding of algorithms and React.</h3>
                    <p class="lead my-2 mx-auto text-center">
                       As much as Visualizer is about my personal exploration, it's also a demonstration of my skills and passion for Software Engineering. Currently, I'm on the lookout for new job opportunities that will allow me to grow and contribute.
                    </p>
                    <p class="lead my-2 mx-5 text-center">
                        As I navigate through this vast sea of computational logic, I'll keep adding more to this collection.If you're interested in my work and have an opening in your organization, or simply want to discuss algorithms and programming, I would be thrilled to connect with you. Let's make something great together!
                    </p>
                    <p class="lead my-2 mx-5 text-center">
                        Feel free to share your thoughts, suggestions, and questions. Together, we can make algorithm learning a more engaging and collaborative adventure!Please feel free to reach out to me at itaibenjy@gmail.com. You can also find more about my professional background on my <a href="https://www.linkedin.com/in/itai-benjamin-66696b250"> LinkedIn Profile </a>.
                    </p>
                    <p class="lead my-2 mx-5 text-center">
                        For your convenience, you can also <a href={CV} download> Download My Resume.</a>
                    </p>
            </div>
        </MDBContainer>
        </>)
}