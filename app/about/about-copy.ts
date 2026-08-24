export const CASCADE_URL = "https://plume.hackmit.org/project/lwjjl-xrsqe-ucvue-rsqap";

export const ABOUT_SECTIONS = [
  {
    id: "intro",
    title: "About",
    paragraphs: [
      "hey, I’m Sahil.",
      "I’m currently a 10th grader at Fulton Science Academy, in Alpharetta, Georgia.",
    ],
  },
  {
    id: "problem-solving",
    title: "Problem-solving & learning",
    paragraphs: [
      "I’m passionate about innovation, creation, and discovering new ways to solve problems. A fun fact about me is that I have a naturally tendency to find unconventional ways around things, even if that tendency occasionally gets me into trouble.",
      "This persistence has helped me solve a lot of problems I normally couldn’t have otherwise. For example, when a cardiac simulator didn’t directly output the current I needed for a calculation, I reverse engineered how its available voltage and conductivity data related to that current and built an approximation from those outputs instead.",
      "I am research and learning about ML, and have done multiple projects in the past. My work has mostly focused on physics-informed neural nets, inverse problems, and natural language processing.",
    ],
  },
  {
    id: "bpc-fno-rit",
    title: "BPC-FNO & RIT",
    paragraphs: [
      "My first project is a physics-informed neural operator for cardiac feature reconstruction. It is based upon a novel extension of magnetocardiography (MCG, a study of the heart’s magnetic field), called magnetoionography (MIG), which investigates the specific intracellular ionic currents inside a heart. In simple terms, the core and most fundamental currents inside a heart, that then affect the outer (extracellular) electrical currents.",
      "Data was partly synthetic and real. Synthetic data was generated via the Bueno-Orovio-Cherry-Fenton cardiac model on OpenCARP (a cardiac data simulation tool). The real data was from a public data set, the Kiel Cardio Database.",
      "I called this pipeline BPC-FNO, and I had benchmarked it on reconstruction and then disease classification (general ischemia, arrhythmia, hypertrophy) against traditional electrocardiography (ECG) models like the popular Tikhonov inversion model as well as MCG-specific models like MCG-MNE. BPC-FNO outperformed these models in terms of classification accuracy.",
      "I am currently improving on this pipeline by starting to acquire real clinical data, incorporate patient-specific geometry (this basically means that an individual’s heart is very custom and most models will not generally perform well on all people), and a more specific and broader range of disease classification.",
      "I had recently got at internship in Professor Linwei Wang’s lab at Rochester Institute of Technology. I am studying ventricular tachycardia over there, specifically how to make an accurate synthetic pipeline via OpenCARP for VT data generation. I am working under Sumeet Atul Vadhavkar, a PhD student in the lab.",
    ],
  },
  {
    id: "symbolic-mathematics",
    title: "Symbolic mathematics & interpretability",
    paragraphs: [
      "Next, I did a paper on symbolic mathematics, NLP, and mechanistic interpretability and am currently awaiting results for my submission to MathNLP EMNLP 2026. In this paper, we trained a graph neural network on EML trees - a new universal operator defined as eml(x,y) = exp(x) - ln(y) - to see if they can outperform traditional transformers on symbolic mathematics and interpretability through the operator abstraction.",
      "We discovered that since EML trees are inherently binary, their size massively explodes, in comparison to abstract syntax trees (AST trees, the ones used in transformers for mathematics). Due to this, we had to employ various compression techniques, such as directed acrylic graphs (DAG), learned and frequent-motifs, and macro graphs. Through these techniques, we were able to significantly reduce the size of the EML trees and also made it more computationally efficient for GNN training.",
      "However, even through these compression techniques, it was still not viable to use EML for mathematics. On the mechanistic interpretibility side, we were able to successfully trace the path one hundred percent of the time, due to the path and tree-like nature of the trees. This study showed that EML trees are not a good direction to go to for replacing or even augmenting current LLM and transformer-based mathematical methods. This study was a success since we came to a conclusion with strong evidence.",
    ],
  },
  {
    id: "korucusat-2",
    title: "KORUCUSAT-2",
    paragraphs: [
      "I am the power subsystem co-lead on our school’s CubeSat, KORUCUSAT-2. We estimate to launch the satellite in January of 2028. We are using 30x40mm EXA solar panels, and Amprius SA10 18650 silicon-anode batteries.",
      "The main objective of our CubeSat mission is to test silicon-anode batteries in space. NASA has done this before, but they have not published any results, and no rigorous tests were performed. Our satellite aims to bring more data and a proper, scientific testing method to objectively determine the performance of these batteries in space.",
      "We are simulating our satellite’s power dynamics via FreeFlyer, a satellite software for power. We recently acquired our PCBs and the panels, and have started physical experimentatio and devising testing.",
    ],
  },
  {
    id: "competitions-robotics",
    title: "Competitions & robotics",
    paragraphs: [
      "I also really enjoy solving problems, and do competitive mathematics, programming, and robotics. I have been doing math olympiads like AMC since 6th grade, and got a score of 105 (improving…). Other than that, I have participated in a lot of local competitions and placed in them as well.",
      "For competitive programming, I am doing LeetCode and preparing to do USACO. Additionally, I am apart of FTC Team Geneton #26507, and we are a strong, determined team. I’m working in both building and programming.",
    ],
  },
  {
    id: "hackathons",
    title: "Hackathons",
    paragraphs: [
      "I have attended a fair share of hackathons, most recently MIT Blueprint’s hackathon (very fun!). While we didn’t win a prize, it was a great opportunity and I believed we made a great project.",
      "We had developed CASCADE, a system to predict epidemic spread using an RNN, over diseases such as COVID-19, ebola, dengue, and measles. We incorporated Monte Carlo dropout to increase prediction robustness. We also used a SEIR simulation engine. More can be read about it here: https://plume.hackmit.org/project/lwjjl-xrsqe-ucvue-rsqap.",
    ],
  },
  {
    id: "closing",
    title: "Closing",
    paragraphs: [
      "Well, if you read all that, congratulations! This is just a glimpse of what I’ve been up to, and I will be constantly updating this page.",
    ],
  },
] as const;

export const ABOUT_COPY_SHA256 = "4baa15797f11ca62c358505439547e40245b07d7d72f2f22f1cee5d008f8cee2";
