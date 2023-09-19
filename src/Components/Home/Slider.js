import { Carousel, Typography, Button } from "@material-tailwind/react";
import Slider1 from "../../Images/Home/slider1.jpg"
import Slider2 from "../../Images/Home/slider2.jpg"
import Slider3 from "../../Images/Home/slider3.jpg"
import Slider4 from "../../Images/Home/pexels-photo-4308095.jpeg"
import { useNavigate } from "react-router-dom";

export default function Slider() {
    const navigate = useNavigate()
    return (
        <div className="h-[40vh] sm:h-[60vh] md:h-[70vh]" >
            <Carousel className="" autoplay={true} loop={true}>
                <div className="relative h-full w-full">
                    <video
                        src="https://tecdn.b-cdn.net/img/video/forest.mp4"
                        alt="video 1"
                        className="h-full w-full object-cover"
                        autoPlay
                        muted
                        loop
                    />

                    <div className="absolute inset-0 grid h-full w-full place-items-center bg-black/75">
                        <div className="hidden sm:block w-3/4 text-center md:w-2/4">
                            <Typography
                                variant="h1"
                                color="white"
                                className="mb-4 text-3xl md:text-4xl lg:text-5xl"
                            >
                                Who We are
                            </Typography>
                            <Typography
                                variant="lead"
                                color="white"
                                className="mb-12 opacity-80"
                            >
                                The instu talent hub is a education company that provides reward for any exams all over India.These exams conduct by government board as like school, college, competative exams.
                            </Typography>
                            <div className="flex justify-center gap-2">
                                <Button size="lg" color="white" onClick={() => navigate("course")}>
                                    Courses
                                </Button>
                                <Button size="lg" color="white" variant="text" onClick={() => navigate("about")}>
                                    Read More
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="relative h-full w-full">
                    <img
                        src="https://images.unsplash.com/photo-1493246507139-91e8fad9978e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2940&q=80"
                        alt="image 2"
                        className="h-full w-full object-cover"
                    />
                    <div className="absolute inset-0 grid h-full w-full items-center bg-black/75">
                        <div className="hidden sm:block w-3/4 pl-12 md:w-2/4 md:pl-20 lg:pl-32">
                            <Typography
                                variant="h1"
                                color="white"
                                className="mb-4 text-3xl md:text-4xl lg:text-5xl"
                            >
                                Who we are
                            </Typography>
                            <Typography
                                variant="lead"
                                color="white"
                                className=" mb-12 opacity-80"
                            >
                                The instu talent hub is a education company that provides reward for any exams all over India.These exams conduct by government board as like school, college, competative exams.

                            </Typography>
                            <div className="flex gap-2">
                                <Button size="lg" color="white" onClick={() => navigate("course")}>
                                    Courses
                                </Button>
                                <Button size="lg" color="white" variant="text" onClick={() => navigate("about")}>
                                    Read More
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
                {/* <div className="relative h-full w-full">
                    <img
                        src="https://images.unsplash.com/photo-1518623489648-a173ef7824f3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2762&q=80"
                        alt="image 3"
                        className="h-full w-full object-cover"
                    />
                    <div className="absolute inset-0 grid h-full w-full items-end bg-black/75">
                        <div className="hidden sm:block w-3/4 pl-12 pb-12 md:w-2/4 md:pl-20 md:pb-20 lg:pl-32 lg:pb-32">
                            <Typography
                                variant="h1"
                                color="white"
                                className="mb-4 text-3xl md:text-4xl lg:text-5xl"
                            >
                               Who we are
                            </Typography>
                            <Typography
                                variant="lead"
                                color="white"
                                className="mb-12 opacity-80"
                            >
                                The instu talent hub is a education company that provides reward for any exams all over India.These exams conduct by government board as like school, college, competative exams.

                            </Typography>
                            <div className="flex gap-2">
                                <Button size="lg" color="white" onClick={() => navigate("course")}>
                                    Courses
                                </Button>
                                <Button size="lg" color="white" variant="text" onClick={() => navigate("about")}>
                                    Read More
                                </Button>
                            </div>
                        </div>
                    </div>
                </div> */}
            </Carousel>
        </div>



    );
}