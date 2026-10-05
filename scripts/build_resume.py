from pathlib import Path

from reportlab.lib.colors import HexColor
from reportlab.lib.pagesizes import letter
from reportlab.pdfbase.pdfmetrics import stringWidth
from reportlab.pdfgen import canvas


ROOT = Path(__file__).resolve().parents[1]
OUTPUT = ROOT / "output" / "pdf" / "sahil-singh-resume-updated.pdf"

PAGE_W, PAGE_H = letter
INK = HexColor("#242724")
MUTED = HexColor("#62655F")
ACCENT = HexColor("#D66737")
PAPER = HexColor("#FAF7EF")
SIDEBAR = HexColor("#EDE6DA")
RULE = HexColor("#D7CFC2")
WHITE = HexColor("#FFFDF8")


def wrap(text: str, font: str, size: float, width: float) -> list[str]:
    lines: list[str] = []
    for paragraph in text.split("\n"):
        words = paragraph.split()
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


def draw_text(
    pdf: canvas.Canvas,
    text: str,
    x: float,
    y: float,
    width: float,
    *,
    font: str = "Helvetica",
    size: float = 7.5,
    leading: float = 10,
    color=INK,
) -> float:
    pdf.setFillColor(color)
    pdf.setFont(font, size)
    for line in wrap(text, font, size, width):
        pdf.drawString(x, y, line)
        y -= leading
    return y


def section_heading(pdf: canvas.Canvas, number: str, title: str, x: float, y: float, width: float) -> float:
    pdf.setFillColor(ACCENT)
    pdf.setFont("Helvetica-Bold", 6.2)
    pdf.drawString(x, y + 3, number)
    pdf.setFillColor(INK)
    pdf.setFont("Times-Bold", 14.2)
    pdf.drawString(x + 22, y, title)
    pdf.setStrokeColor(RULE)
    pdf.setLineWidth(0.55)
    pdf.line(x, y - 6, x + width, y - 6)
    return y - 23


def role(pdf: canvas.Canvas, title: str, dates: str, body: str, x: float, y: float, width: float) -> float:
    pdf.setFillColor(INK)
    pdf.setFont("Helvetica-Bold", 8.7)
    pdf.drawString(x, y, title)
    pdf.setFillColor(MUTED)
    pdf.setFont("Helvetica-Bold", 6.4)
    pdf.drawRightString(x + width, y + 0.5, dates.upper())
    y -= 13
    y = draw_text(pdf, body, x, y, width, size=7.35, leading=9.7, color=INK)
    return y - 9


def paper_item(pdf: canvas.Canvas, name: str, venue: str, body: str, x: float, y: float, width: float) -> float:
    pdf.setFillColor(INK)
    pdf.setFont("Helvetica-Bold", 8.7)
    pdf.drawString(x, y, name)
    pdf.setFillColor(ACCENT)
    pdf.setFont("Helvetica-Bold", 6.25)
    pdf.drawRightString(x + width, y + 0.4, venue.upper())
    y -= 13
    y = draw_text(pdf, body, x, y, width, size=7.15, leading=9.35, color=INK)
    return y - 8


def bullet(pdf: canvas.Canvas, text: str, x: float, y: float, width: float) -> float:
    pdf.setFillColor(ACCENT)
    pdf.rect(x, y + 2.1, 3.2, 3.2, fill=1, stroke=0)
    y = draw_text(pdf, text, x + 10, y, width - 10, size=7.05, leading=9.4, color=INK)
    return y - 6


def side_heading(pdf: canvas.Canvas, text: str, x: float, y: float, width: float) -> float:
    pdf.setFillColor(ACCENT)
    pdf.setFont("Helvetica-Bold", 6.4)
    pdf.drawString(x, y, text.upper())
    pdf.setStrokeColor(HexColor("#CFC4B4"))
    pdf.setLineWidth(0.45)
    pdf.line(x, y - 5, x + width, y - 5)
    return y - 19


def side_item(
    pdf: canvas.Canvas,
    label: str,
    text: str,
    x: float,
    y: float,
    width: float,
    *,
    url: str | None = None,
) -> float:
    if label:
        pdf.setFillColor(INK)
        pdf.setFont("Helvetica-Bold", 7.1)
        pdf.drawString(x, y, label)
        y -= 10
    first_y = y
    y = draw_text(pdf, text, x, y, width, size=6.8, leading=8.8, color=MUTED)
    if url:
        lines = wrap(text, "Helvetica", 6.8, width)
        if lines:
            pdf.linkURL(
                url,
                (x, first_y - 2.0, x + min(width, stringWidth(lines[0], "Helvetica", 6.8)), first_y + 7.0),
                relative=0,
                thickness=0,
            )
    return y - 7


def build() -> None:
    OUTPUT.parent.mkdir(parents=True, exist_ok=True)
    pdf = canvas.Canvas(str(OUTPUT), pagesize=letter, pageCompression=1)
    pdf.setTitle("Sahil Singh Resume")
    pdf.setAuthor("Sahil Singh")
    pdf.setSubject("Research, scientific machine learning, and engineering resume")

    pdf.setFillColor(PAPER)
    pdf.rect(0, 0, PAGE_W, PAGE_H, fill=1, stroke=0)
    pdf.setFillColor(ACCENT)
    pdf.rect(0, PAGE_H - 7, PAGE_W, 7, fill=1, stroke=0)

    side_x = 414
    side_w = PAGE_W - side_x
    pdf.setFillColor(SIDEBAR)
    pdf.rect(side_x, 0, side_w, PAGE_H - 7, fill=1, stroke=0)

    main_x = 42
    main_w = 344
    inner_side_x = 436
    inner_side_w = 152

    pdf.setFillColor(INK)
    pdf.setFont("Times-Bold", 31)
    pdf.drawString(main_x, 743, "Sahil Singh")
    pdf.setFillColor(ACCENT)
    pdf.setFont("Helvetica-Bold", 7.8)
    pdf.drawString(main_x, 719, "RESEARCH  /  SCIENTIFIC ML  /  EMBEDDED SYSTEMS")
    pdf.setStrokeColor(RULE)
    pdf.setLineWidth(0.8)
    pdf.line(main_x, 704, main_x + main_w, 704)

    pdf.setFillColor(INK)
    pdf.rect(inner_side_x, 730, 38, 38, fill=1, stroke=0)
    pdf.setFillColor(WHITE)
    pdf.setFont("Times-Bold", 14)
    pdf.drawCentredString(inner_side_x + 19, 743, "SS")
    pdf.setFillColor(MUTED)
    pdf.setFont("Helvetica", 6.1)
    pdf.drawString(inner_side_x + 47, 749, "DULUTH, GA")
    pdf.drawString(inner_side_x + 47, 738, "UPDATED OCTOBER 2026")

    y = 681
    pdf.setFillColor(ACCENT)
    pdf.setFont("Helvetica-Bold", 6.2)
    pdf.drawString(main_x, y, "PROFILE")
    y -= 15
    y = draw_text(
        pdf,
        "Student researcher working across physics-informed machine learning, biomedical inverse modeling, world-model evaluation, and human-validated satellite imagery.",
        main_x,
        y,
        main_w,
        font="Times-Roman",
        size=9.3,
        leading=12.2,
        color=INK,
    )
    y -= 13

    y = section_heading(pdf, "01", "Experience", main_x, y, main_w)
    y = role(
        pdf,
        "Research Assistant  |  MIT STAR Lab",
        "Sep 2026 - Present",
        "Validate news-driven satellite-event detections using temporal imagery; adjudicate visibility windows and document uncertain cases for SkyScraper's human-in-the-loop geospatial pipeline under Prof. Kerri Cahoy and Ms. Anderson.",
        main_x,
        y,
        main_w,
    )
    y = role(
        pdf,
        "Research Assistant  |  Rochester Institute of Technology",
        "Jul 2026 - Present",
        "Study ventricular tachycardia in Prof. Linwei Wang's lab under Sumeet Vadhavkar. Built a reproducible openCARP S1-S2 scar-substrate study, resolving the capture transition at 368-369 ms and a 46 ms directional delay across 24/24 ring sectors.",
        main_x,
        y,
        main_w,
    )

    y = section_heading(pdf, "02", "Accepted Research", main_x, y, main_w)
    y = paper_item(
        pdf,
        "GEML",
        "NeurIPS VeriCodeGen",
        "Studied learned equivalence over expressions compiled to one operator; measured 41x median tree expansion and showed that nine fitted graph models remained near chance under variable-role swaps.",
        main_x,
        y,
        main_w,
    )
    y = paper_item(
        pdf,
        "MineOcclude",
        "NeurIPS PhysWorldAI + ESR",
        "Built a paired Minecraft benchmark separating visual evidence, motion predictability, and readout effects; achieved 0.083-0.107 block RMSE under visible/glass conditions and characterized failure under opacity.",
        main_x,
        y,
        main_w,
    )
    y = paper_item(
        pdf,
        "MIG-PINO Cardiac Field Localization",
        "NeurIPS PhysWorldAI",
        "Evaluated FNO and DeepONet on 500 cardiac simulations: held-out LAT/APD90 field R2 reached at least 0.954 while localization Dice exposed failure modes hidden by global accuracy.",
        main_x,
        y,
        main_w,
    )

    y = section_heading(pdf, "03", "Selected Engineering & Leadership", main_x, y, main_w)
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

    y = section_heading(pdf, "04", "Additional Projects", main_x, y, main_w)
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

    sy = 700
    sy = side_heading(pdf, "Contact", inner_side_x, sy, inner_side_w)
    sy = side_item(pdf, "Email", "gensahilsingh@gmail.com", inner_side_x, sy, inner_side_w, url="mailto:gensahilsingh@gmail.com")
    sy = side_item(pdf, "Phone", "724-457-4644", inner_side_x, sy, inner_side_w, url="tel:+17244574644")
    sy = side_item(pdf, "Portfolio", "gensahilsingh.vercel.app", inner_side_x, sy, inner_side_w, url="https://gensahilsingh.vercel.app")
    sy = side_item(pdf, "LinkedIn", "linkedin.com/in/sahil-singh-17a641239", inner_side_x, sy, inner_side_w, url="https://www.linkedin.com/in/sahil-singh-17a641239")
    sy = side_item(pdf, "GitHub", "github.com/sahilsinghthefirst", inner_side_x, sy, inner_side_w, url="https://github.com/sahilsinghthefirst")

    sy -= 3
    sy = side_heading(pdf, "Education", inner_side_x, sy, inner_side_w)
    sy = side_item(pdf, "Georgia Institute of Technology", "Distance Math Year 1 + CS 1301\nAug 2026 - Present", inner_side_x, sy, inner_side_w)
    sy = side_item(pdf, "Fulton Science Academy", "Grade 10  |  Expected May 2029", inner_side_x, sy, inner_side_w)

    sy -= 3
    sy = side_heading(pdf, "Technical Skills", inner_side_x, sy, inner_side_w)
    sy = side_item(pdf, "Machine Learning", "PyTorch, neural operators, FNO, DeepONet, GNNs, U-Net, RNNs, Monte Carlo dropout", inner_side_x, sy, inner_side_w)
    sy = side_item(pdf, "Scientific Computing", "openCARP, CellML, BOCF, Biot-Savart modeling, inverse problems, uncertainty quantification", inner_side_x, sy, inner_side_w)
    sy = side_item(pdf, "Programming", "Python, C++, Java, Linux/WSL, reproducible research workflows", inner_side_x, sy, inner_side_w)
    sy = side_item(pdf, "Embedded & Robotics", "Raspberry Pi, ESP32, Arduino, sensors, soldering, drones, ArduPilot, CAD/Blender", inner_side_x, sy, inner_side_w)

    sy -= 3
    sy = side_heading(pdf, "Recognition", inner_side_x, sy, inner_side_w)
    for recognition in [
        "2x GSEF Best in Category",
        "Thermo Fisher JIC Top 300",
        "3x Fulton County Science Fair qualifier",
        "GaSTC state qualifier, grades 6-8; 1st in category twice",
        "Top 3 Speaker, Ivy Bridge Debate",
    ]:
        pdf.setFillColor(ACCENT)
        pdf.rect(inner_side_x, sy + 2.2, 2.8, 2.8, fill=1, stroke=0)
        sy = draw_text(pdf, recognition, inner_side_x + 9, sy, inner_side_w - 9, size=6.75, leading=8.6, color=MUTED)
        sy -= 5

    pdf.setFillColor(MUTED)
    pdf.setFont("Helvetica", 5.7)
    pdf.drawString(main_x, 23, "Selected work and results; full papers and project portfolio available online.")
    pdf.save()


if __name__ == "__main__":
    build()
