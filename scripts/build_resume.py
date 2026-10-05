from pathlib import Path

from reportlab.lib.colors import HexColor
from reportlab.lib.pagesizes import letter
from reportlab.pdfbase.pdfmetrics import stringWidth
from reportlab.pdfgen import canvas


ROOT = Path(__file__).resolve().parents[1]
OUTPUT = ROOT / "output" / "pdf" / "sahil-singh-resume-updated.pdf"

PAGE_W, PAGE_H = letter
INK = HexColor("#202421")
MUTED = HexColor("#5E655F")
ACCENT = HexColor("#D66A3A")
PAPER = HexColor("#F8F4EA")
RULE = HexColor("#D9D1C3")


def wrap(text: str, font: str, size: float, width: float) -> list[str]:
    words = text.split()
    lines: list[str] = []
    current = ""
    for word in words:
        candidate = f"{current} {word}".strip()
        if not current or stringWidth(candidate, font, size) <= width:
            current = candidate
        else:
            lines.append(current)
            current = word
    if current:
        lines.append(current)
    return lines


def draw_lines(
    pdf: canvas.Canvas,
    text: str,
    x: float,
    y: float,
    width: float,
    *,
    font: str = "Helvetica",
    size: float = 7.25,
    leading: float = 9.3,
    color=INK,
) -> float:
    pdf.setFillColor(color)
    pdf.setFont(font, size)
    for line in wrap(text, font, size, width):
        pdf.drawString(x, y, line)
        y -= leading
    return y


def section_title(pdf: canvas.Canvas, text: str, x: float, y: float, width: float) -> float:
    pdf.setFillColor(ACCENT)
    pdf.setFont("Helvetica-Bold", 8.2)
    pdf.drawString(x, y, text.upper())
    pdf.setStrokeColor(RULE)
    pdf.setLineWidth(0.6)
    pdf.line(x, y - 3.5, x + width, y - 3.5)
    return y - 14


def role(
    pdf: canvas.Canvas,
    title: str,
    dates: str,
    body: str,
    x: float,
    y: float,
    width: float,
) -> float:
    pdf.setFillColor(INK)
    pdf.setFont("Helvetica-Bold", 8.0)
    pdf.drawString(x, y, title)
    pdf.setFont("Helvetica-Bold", 6.8)
    pdf.setFillColor(MUTED)
    pdf.drawRightString(x + width, y + 0.2, dates)
    y -= 10
    y = draw_lines(pdf, body, x, y, width, size=7.05, leading=8.9, color=INK)
    return y - 6


def research_item(
    pdf: canvas.Canvas,
    name: str,
    status: str,
    body: str,
    x: float,
    y: float,
    width: float,
) -> float:
    pdf.setFillColor(INK)
    pdf.setFont("Helvetica-Bold", 8.0)
    pdf.drawString(x, y, name)
    pdf.setFillColor(ACCENT)
    pdf.setFont("Helvetica-Bold", 6.7)
    pdf.drawRightString(x + width, y + 0.2, status)
    y -= 10
    y = draw_lines(pdf, body, x, y, width, size=6.9, leading=8.7, color=INK)
    return y - 5


def bullet(pdf: canvas.Canvas, text: str, x: float, y: float, width: float) -> float:
    pdf.setFillColor(ACCENT)
    pdf.circle(x + 2.0, y + 2.0, 1.35, fill=1, stroke=0)
    y = draw_lines(pdf, text, x + 10, y, width - 10, size=6.9, leading=8.7, color=INK)
    return y - 4


def sidebar_block(
    pdf: canvas.Canvas,
    heading: str,
    items: list[tuple[str, str]],
    x: float,
    y: float,
    width: float,
) -> float:
    y = section_title(pdf, heading, x, y, width)
    for label, text in items:
        if label:
            pdf.setFillColor(INK)
            pdf.setFont("Helvetica-Bold", 7.2)
            pdf.drawString(x, y, label)
            y -= 8.7
        y = draw_lines(pdf, text, x, y, width, size=6.75, leading=8.4, color=INK)
        y -= 5
    return y - 2


def build() -> None:
    OUTPUT.parent.mkdir(parents=True, exist_ok=True)
    pdf = canvas.Canvas(str(OUTPUT), pagesize=letter, pageCompression=1)
    pdf.setTitle("Sahil Singh Resume")
    pdf.setAuthor("Sahil Singh")
    pdf.setSubject("Research, scientific machine learning, and engineering resume")

    pdf.setFillColor(PAPER)
    pdf.rect(0, 0, PAGE_W, PAGE_H, fill=1, stroke=0)
    pdf.setFillColor(INK)
    pdf.setFont("Helvetica-Bold", 25)
    pdf.drawString(36, 748, "Sahil Singh")
    pdf.setFillColor(ACCENT)
    pdf.setFont("Helvetica-Bold", 8.8)
    pdf.drawString(36, 731, "RESEARCH  /  SCIENTIFIC ML  /  EMBEDDED SYSTEMS")
    pdf.setFillColor(MUTED)
    pdf.setFont("Helvetica", 7.0)
    contact = (
        "gensahilsingh@gmail.com  |  724-457-4644  |  gensahilsingh.vercel.app  |  "
        "linkedin.com/in/sahil-singh-17a641239  |  github.com/sahilsinghthefirst"
    )
    pdf.drawString(36, 715, contact)
    pdf.setStrokeColor(ACCENT)
    pdf.setLineWidth(1.2)
    pdf.line(36, 705, 576, 705)

    main_x = 36
    main_w = 370
    side_x = 425
    side_w = 151
    y = 688

    y = section_title(pdf, "Experience", main_x, y, main_w)
    y = role(
        pdf,
        "Research Assistant | MIT STAR Lab",
        "Sep 2026 - Present",
        "Validate news-driven satellite-event detections using temporal imagery; adjudicate visibility windows and document uncertain cases for SkyScraper's human-in-the-loop geospatial pipeline under Prof. Kerri Cahoy and Ms. Anderson.",
        main_x,
        y,
        main_w,
    )
    y = role(
        pdf,
        "Research Assistant | Rochester Institute of Technology",
        "Jul 2026 - Present",
        "Study ventricular tachycardia in Prof. Linwei Wang's lab under Sumeet Vadhavkar. Built a reproducible openCARP S1-S2 scar-substrate study, resolving the capture transition at 368-369 ms and a 46 ms directional delay across 24/24 ring sectors.",
        main_x,
        y,
        main_w,
    )

    y = section_title(pdf, "Accepted Research", main_x, y, main_w)
    y = research_item(
        pdf,
        "GEML",
        "Accepted - VeriCodeGen 2026",
        "Studied learned equivalence over expressions compiled to one operator; measured 41x median tree expansion and showed that nine fitted graph models remained near chance under variable-role swaps.",
        main_x,
        y,
        main_w,
    )
    y = research_item(
        pdf,
        "MineOcclude",
        "Accepted - PhysWorldAI + ESR 2026",
        "Built a paired Minecraft benchmark separating visual evidence, motion predictability, and readout effects; achieved 0.083-0.107 block RMSE under visible/glass conditions and characterized failure under opacity.",
        main_x,
        y,
        main_w,
    )
    y = research_item(
        pdf,
        "MIG-PINO Cardiac Field Localization",
        "Accepted - PhysWorldAI 2026",
        "Evaluated FNO and DeepONet on 500 cardiac simulations: held-out LAT/APD90 field R2 reached at least 0.954 while localization Dice exposed failure modes hidden by global accuracy.",
        main_x,
        y,
        main_w,
    )

    y = section_title(pdf, "Selected Engineering & Leadership", main_x, y, main_w)
    y = bullet(
        pdf,
        "CubeSAT Power Subsystem Co-Lead - modeled generation, storage, duty cycles, and loads; presented at SmallSat 2026 and the NCSS Student Research Conference 2026.",
        main_x,
        y,
        main_w,
    )
    y = bullet(
        pdf,
        "CASCADE, MIT Blueprint - combined an RNN trained on 7,629 outbreak records with a global SEIR simulator and Monte Carlo Tree Search across 155+ countries.",
        main_x,
        y,
        main_w,
    )
    y = bullet(
        pdf,
        "Distributed gas-leak localization - ESP32 PM2.5/CO2 sensor graph, dual Raspberry Pi 5 cluster, and lightweight U-Net spatial reconstruction.",
        main_x,
        y,
        main_w,
    )
    y = bullet(
        pdf,
        "AP Calculus BC teaching assistant and Math Olympiad tutor; Leading Officer at Peachtree Math Circle.",
        main_x,
        y,
        main_w,
    )

    y = section_title(pdf, "Additional Projects", main_x, y, main_w)
    y = bullet(
        pdf,
        "Passive edge-IoT energy harvester - piezoelectric and triboelectric multi-source design; GSEF Best in Category and creative problem-solving award.",
        main_x,
        y,
        main_w,
    )
    y = bullet(
        pdf,
        "Autonomous agriculture drone - custom 3.5-inch build with ArduPilot flight control, Arduino seed payload, and soil-informed deployment; CPS Expo 2nd place.",
        main_x,
        y,
        main_w,
    )
    y = bullet(
        pdf,
        "IRIS face-recognition attendance system - Raspberry Pi inference with automated spreadsheet logging.",
        main_x,
        y,
        main_w,
    )

    sy = 688
    sy = sidebar_block(
        pdf,
        "Education",
        [
            (
                "Georgia Institute of Technology",
                "Distance Math Year 1 + CS 1301\nAug 2026 - Present",
            ),
            (
                "Fulton Science Academy",
                "High School Diploma\nGrade 10 | Expected May 2029",
            ),
        ],
        side_x,
        sy,
        side_w,
    )
    sy = sidebar_block(
        pdf,
        "Technical Skills",
        [
            ("Machine Learning", "PyTorch, neural operators, FNO, DeepONet, GNNs, U-Net, RNNs, Monte Carlo dropout"),
            ("Scientific Computing", "openCARP, CellML, BOCF, Biot-Savart modeling, inverse problems, uncertainty quantification"),
            ("Programming", "Python, C++, Java, Linux/WSL, reproducible research workflows"),
            ("Embedded & Robotics", "Raspberry Pi, ESP32, Arduino, sensors, soldering, drones, ArduPilot, CAD/Blender"),
        ],
        side_x,
        sy,
        side_w,
    )
    sy = sidebar_block(
        pdf,
        "Recognition",
        [
            ("", "2x GSEF Best in Category"),
            ("", "Thermo Fisher JIC Top 300"),
            ("", "3x Fulton County Science Fair qualifier"),
            ("", "GaSTC state qualifier, grades 6-8; 1st in category twice"),
            ("", "Top 3 Speaker, Ivy Bridge Debate"),
        ],
        side_x,
        sy,
        side_w,
    )
    sy = sidebar_block(
        pdf,
        "Research Focus",
        [
            (
                "",
                "Physics-informed ML, neural operators, biomedical inverse modeling, world-model evaluation, uncertainty-aware benchmarking, and satellite-imagery analysis.",
            )
        ],
        side_x,
        sy,
        side_w,
    )

    pdf.setFillColor(MUTED)
    pdf.setFont("Helvetica-Oblique", 5.8)
    pdf.drawRightString(576, 18, "Updated October 2026")
    pdf.save()


if __name__ == "__main__":
    build()
