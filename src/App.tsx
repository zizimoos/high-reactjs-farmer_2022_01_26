import styled from "styled-components";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useTransform,
  useViewportScroll,
} from "framer-motion";
import { useEffect, useRef, useState } from "react";

const Wrapper = styled(motion.div)`
  width: 100vw;
  height: 300vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
`;

const Box = styled(motion.div)`
  width: 200px;
  height: 200px;
  margin: 20px;
  border-radius: 30px;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  background-color: rgba(255, 255, 255, 0.2);
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.5);
`;

const Box2 = styled(motion.div)`
  width: 100px;
  height: 100px;
  margin: 20px;
  border-radius: 30px;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  background-color: white;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.5);
`;

const BiggerBox = styled(motion.div)`
  width: 400px;
  height: 400px;
  margin: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(255, 255, 255, 0.2);
  border-radius: 30px;
  overflow: hidden;
`;

const Circle = styled(motion.div)`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  place-self: center;
  background-color: white;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.5);
`;

const Svg = styled.svg`
  width: 200px;
  height: 200px;
  color: white;
  path {
    stroke: white;
    stroke-width: 5;
  }
`;

const svgVariants = {
  start: { fill: "rgba(255,255,255,0)", pathLength: 0 },
  end: {
    fill: "rgba(255,255,255,1)",
    pathLength: 1,
  },
};

const boxVariants = {
  start: { scale: 0, opacity: 0 },
  end: {
    scale: 1,
    opacity: 1,
    rotateZ: 360,
    transition: {
      type: "spring",
      bounce: 0.7,
      duration: 0.5,
      delaychildren: 0.5,
      staggerChildren: 0.2,
    },
  },
};

const Box2Variants = {
  hover: { scale: 1.2, rotateZ: 360 },
  click: { scale: 1, borderRadius: "50%" },
  drag: { scale: 0.5, backgroundColor: "rgba(255, 255, 255, 0.2)" },
};

const CircleVariants = {
  start: { scale: 0, opacity: 0 },
  end: {
    scale: 1.5,
    opacity: 1,
    rotateZ: 360,
    transition: { type: "spring", bounce: 0.7, duration: 4 },
  },
};

const ToggleBoxVariants = {
  initial: { scale: 0, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    rotateZ: 360,
    transition: { type: "spring", duration: 0.5 },
  },
  leaving: {
    scale: 0,
    opacity: 0,
    y: -150,
    rotateZ: -360,
    transition: { duration: 0.5 },
  },
};
const SlideVariants = {
  initial: (back: boolean) => {
    return {
      scale: 0,
      opacity: 0,
      x: back ? -500 : 500,
      rotateY: 360,
      transition: { type: "spring", duration: 1 },
    };
  },
  // initial: {
  //   scale: 0,
  //   opacity: 0,
  //   x: -500,
  //   rotateY: 360,
  //   transition: { type: "spring", duration: 1 },
  // },
  visible: {
    scale: 1,
    opacity: 1,
    x: 0,
    transition: { duration: 1 },
  },
  leaving: (back: boolean) => {
    return {
      scale: 0,
      opacity: 0,
      x: back ? 500 : -500,
      transition: { duration: 1 },
    };
  },
  // leaving: {
  //   scale: 0,
  //   opacity: 0,
  //   x: 500,
  //   transition: { duration: 1 },
  // },
};

const SlideWrapper = styled.div`
  margin-top: 150px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
`;
const slideData = [
  "first",
  "second",
  "third",
  "fourth",
  "fifth",
  "sixth",
  "seventh",
  "eighth",
  "ninth",
  "tenth",
];

function App() {
  const biggerBoxRef = useRef<HTMLDivElement>(null);
  const width = window.innerWidth;
  const height = window.innerHeight;

  const x = useMotionValue(0);
  const scale = useTransform(x, [-width / 2, 0, width / 2], [2, 0.5, 2]);
  const rotateZ = useTransform(x, [-width / 2, width / 2], [-360, 360]);
  const background = useTransform(
    x,
    [-width / 2, 0, width / 2],
    [
      "linear-gradient(135deg, rgb(0, 210, 238), rgb(0, 83, 238))",
      "linear-gradient(135deg, rgb(238, 0, 153), rgb(221, 0, 238))",
      "linear-gradient(135deg, rgb(0, 238, 155), rgb(238, 178, 0))",
    ]
  );

  const { scrollY, scrollYProgress } = useViewportScroll();
  const scrollToScale = useTransform(
    scrollYProgress,
    [0, 0.3, 0.5],
    [0, 10, 1]
  );

  const [showing, setShowing] = useState(false);
  const onClickToggle = () => {
    setShowing((prev) => !prev);
  };
  useEffect(() => {
    scrollY.onChange(() => {
      console.log("scrollY :" + scrollY.get());
    });
    scrollYProgress.onChange(() => {
      console.log("scrollYProgress :" + scrollYProgress.get());
    });
  }, [scrollY, scrollYProgress]);
  //////////////////////////////////////////////////////////
  const [slideOn, setSlideOn] = useState(0);
  const [back, setBack] = useState(false);

  const onClickNext = () => {
    setBack(false);
    setSlideOn((prev) => (prev < slideData.length - 1 ? prev + 1 : 0));
  };
  const onClickPrev = () => {
    setBack(true);
    setSlideOn((prev) => (prev > 0 ? prev - 1 : slideData.length - 1));
  };
  console.log("slideOn :" + slideOn, "slideLength :" + slideData.length);

  return (
    <Wrapper style={{ background }}>
      <Svg
        focusable="false"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 448 512"
      >
        <motion.path
          variants={svgVariants}
          initial={"start"}
          animate={"end"}
          transition={{
            // default: { duration: 10, ease: "easeInOut" },
            pathLength: { duration: 3, ease: "easeInOut" },
            fill: { duration: 1, delay: 1, ease: [1, 0, 0.8, 1] },
          }}
          fill="transparent"
          d="M224 373.12c-25.24-31.67-40.08-59.43-45-83.18-22.55-88 112.61-88 90.06 0-5.45 24.25-20.29 52-45 83.18zm138.15 73.23c-42.06 18.31-83.67-10.88-119.3-50.47 103.9-130.07 46.11-200-18.85-200-54.92 0-85.16 46.51-73.28 100.5 6.93 29.19 25.23 62.39 54.43 99.5-32.53 36.05-60.55 52.69-85.15 54.92-50 7.43-89.11-41.06-71.3-91.09 15.1-39.16 111.72-231.18 115.87-241.56 15.75-30.07 25.56-57.4 59.38-57.4 32.34 0 43.4 25.94 60.37 59.87 36 70.62 89.35 177.48 114.84 239.09 13.17 33.07-1.37 71.29-37.01 86.64zm47-136.12C280.27 35.93 273.13 32 224 32c-45.52 0-64.87 31.67-84.66 72.79C33.18 317.1 22.89 347.19 22 349.81-3.22 419.14 48.74 480 111.63 480c21.71 0 60.61-6.06 112.37-62.4 58.68 63.78 101.26 62.4 112.37 62.4 62.89.05 114.85-60.86 89.61-130.19.02-3.89-16.82-38.9-16.82-39.58z"
        ></motion.path>
      </Svg>

      <Box variants={boxVariants} initial="start" animate="end">
        <Circle variants={CircleVariants}></Circle>
        <Circle variants={CircleVariants}></Circle>
        <Circle variants={CircleVariants}></Circle>
        <Circle variants={CircleVariants}></Circle>
      </Box>
      <Box2
        drag
        dragSnapToOrigin={true}
        dragElastic={0.5}
        dragConstraints={{
          top: -height / 2 + 100,
          left: -width / 2 + 100,
          right: width / 2 - 100,
          bottom: height / 2 - 100,
        }}
        variants={Box2Variants}
        whileHover="hover"
        whileTap="click"
        whileDrag="drag"
      ></Box2>
      <Box2
        style={{ x, scale: scale, rotateZ }}
        drag="x"
        dragSnapToOrigin
      ></Box2>
      <button onClick={() => x.set(200)}>CLICK ME</button>
      <BiggerBox ref={biggerBoxRef}>
        <Box2
          drag
          dragConstraints={biggerBoxRef}
          variants={Box2Variants}
          whileDrag="drag"
        ></Box2>
      </BiggerBox>
      <Box2 style={{ scale: scrollToScale }}></Box2>
      <button onClick={onClickToggle}>CLICK ME</button>
      <AnimatePresence>
        {showing ? (
          <Box
            variants={ToggleBoxVariants}
            initial="initial"
            animate="visible"
            exit="leaving"
          ></Box>
        ) : null}
      </AnimatePresence>
      <SlideWrapper>
        <AnimatePresence custom={back}>
          {slideData.map((item, index) =>
            slideOn === index ? (
              <Box
                custom={back}
                variants={SlideVariants}
                initial="initial"
                animate="visible"
                exit="leaving"
                style={{
                  width: "500px",
                  position: "absolute",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  backgroundColor: "white",
                  fontSize: "2rem",
                  color: "black",
                }}
                key={index}
              >
                {item}
              </Box>
            ) : null
          )}
        </AnimatePresence>
      </SlideWrapper>
      <div
        style={{ marginTop: "150px", display: "flex", flexDirection: "row" }}
      >
        <button onClick={onClickPrev}>PREV</button>
        <button onClick={onClickNext}>NEXT</button>
      </div>
    </Wrapper>
  );
}

export default App;
