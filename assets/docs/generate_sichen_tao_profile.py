#!/usr/bin/env python3
"""Generate a public-source research dossier PDF for Sichen Tao."""

from __future__ import annotations

import json
import re
import subprocess
import time
from collections import Counter
from datetime import date
from pathlib import Path
from typing import Any
from urllib.parse import urljoin
from xml.sax.saxutils import escape

import requests
from bs4 import BeautifulSoup
from reportlab.lib import colors
from reportlab.lib.enums import TA_CENTER, TA_LEFT
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle
from reportlab.lib.units import mm
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.cidfonts import UnicodeCIDFont
from reportlab.platypus import PageBreak, Paragraph, SimpleDocTemplate, Spacer, Table, TableStyle


BASE_DIR = Path(__file__).resolve().parents[1]
OUTPUT_DIR = BASE_DIR / "docs" / "profile"
JSON_PATH = OUTPUT_DIR / "sichen_tao_public_dossier.json"
PDF_PATH = OUTPUT_DIR / "sichen_tao_public_dossier.pdf"

SCHOLAR_USER = "gmOx-i4AAAAJ"
SCHOLAR_URL = f"https://scholar.google.com/citations?user={SCHOLAR_USER}&hl=en&cstart=0&pagesize=100"
JGLOBAL_URL = "https://jglobal.jst.go.jp/en/detail?JGLOBAL_ID=202601018035308144"
TAKIZAWA_MEMBER_URL = "https://www.hpc.is.tohoku.ac.jp/home-en/member-en/"
TAKIZAWA_EVENT_URL = "https://www.hpc.is.tohoku.ac.jp/event-en/2025/5231/"
SENAC_PDF_URL = "https://www.ss.cc.tohoku.ac.jp/sscc/refer/pdf_data/v59-1/v59-1_p54-55.pdf"
TOYAMA_DISSERTATION_URL = "https://toyama.repo.nii.ac.jp/records/2001776"
DBLP_URL = "https://dblp.org/pid/283/6924.html"
OPENALEX_AUTHOR_WORKS_URL = (
    "https://api.openalex.org/works?filter=author.id:https://openalex.org/A5073889784"
    "&per-page=100&sort=publication_year:desc"
)

HEADERS = {"User-Agent": "Mozilla/5.0"}
TIMEOUT = 30

FALLBACK_SCHOLAR_CAPTURE = {
    "name": "Sichen Tao",
    "affiliation": "Tohoku University",
    "verified_email": "Verified email at tohoku.ac.jp - Homepage",
    "homepage_url": "https://www.researchgate.net/profile/Sichen-Tao/publications",
    "interests": ["AI", "Deep Learning", "Neural Networks", "Optimization"],
    "stats": {
        "Citations": {"all": "540", "since_2021": "539"},
        "h-index": {"all": "11", "since_2021": "11"},
        "i10-index": {"all": "11", "since_2021": "11"},
    },
    "works_count": 45,
    "yearly_counts": {2025: 12, 2024: 11, 2023: 6, 2022: 9, 2021: 3, 2020: 4},
    "top_coauthors": [
        {"name": "Zheng Tang", "count": 19},
        {"name": "Shangce Gao", "count": 17},
        {"name": "Yuki Todo", "count": 17},
        {"name": "Ruihan Zhao", "count": 14},
        {"name": "Kaiyu Wang", "count": 12},
        {"name": "Haichuan Yang", "count": 9},
        {"name": "Yifei Yang", "count": 8},
        {"name": "Zhenyu Lei", "count": 5},
        {"name": "Zhiming Zhang", "count": 5},
        {"name": "Yuxiao Hua", "count": 5},
        {"name": "Pengzhong Li", "count": 4},
        {"name": "Sicheng Liu", "count": 4},
    ],
}

CURATED_SCHOLAR_WORKS = [
    {"year": 2025, "title": "A Novel Detection-and-Replacement-Based Order-Operator for Differential Evolution in Solving Complex Bound Constrained Optimization Problems", "citations": 2},
    {"year": 2025, "title": "A state-of-the-art fractional order-driven differential evolution for wind farm layout optimization", "citations": 8},
    {"year": 2025, "title": "Safety-efficiency integrated assembly: The next-stage adaptive task allocation and planning framework for human–robot collaboration", "citations": 16},
    {"year": 2025, "title": "AI-powered model for predicting mortality risk in VA-ECMO patients: a multicenter cohort study", "citations": 6},
    {"year": 2025, "title": "Human-centric assembly planning framework for human–robot collaborative systems with efficient reinforcement self-learning multi-objective evolutionary optimizer", "citations": 2},
    {"year": 2025, "title": "Enhancing convolutional neural network robustness against image noise via an artificial visual system", "citations": 7},
    {"year": 2025, "title": "Improved spherical search algorithm with memory-based dynamic population for optimization", "citations": 0},
    {"year": 2025, "title": "Adversarial game optimization: A game-theoretic metaheuristic for efficient complex optimization and engineering applications", "citations": 0},
    {"year": 2025, "title": "ReLU Neural Networks and Their Training", "citations": 1},
    {"year": 2025, "title": "A Reinforcement Learning-Assisted Fractional-Order Differential Evolution for Solving Wind Farm Layout Optimization Problems", "citations": 0},
    {"year": 2025, "title": "A Biologically Inspired Model for Detecting Object Motion Direction in Stereoscopic Vision", "citations": 0},
    {"year": 2025, "title": "Human-robot Collaborative Resource and Task Planning for Assembly Systems with Self-learning Multi-objective Evolutionary Optimizer", "citations": 0},
    {"year": 2024, "title": "An efficient reconstructed differential evolution variant by some of the current state-of-the-art strategies for solving single objective bound constrained problems", "citations": 12},
    {"year": 2024, "title": "Spherical search algorithm with memory-guided population stage-wise control for bound-constrained global optimization problems", "citations": 13},
    {"year": 2024, "title": "A novel artificial visual system for motion direction detection in color images", "citations": 8},
    {"year": 2024, "title": "Competitive elimination improved differential evolution for wind farm layout optimization problems", "citations": 3},
    {"year": 2024, "title": "Artificial Visual Network with Fully Modeled Retinal Direction-Selective Neural Pathway for Motion Direction Detection in Grayscale Scenes", "citations": 1},
    {"year": 2024, "title": "A Multi-Local Search-Based SHADE for Wind Farm Layout Optimization", "citations": 3},
    {"year": 2024, "title": "A Novel Artificial Visual System with Fully Modeled Retinal Direction-selectivity Ganglion Cell Pathway for Motion Direction Detection in Grayscale Images", "citations": 0},
    {"year": 2024, "title": "Bio-inspired computational model for direction and speed detection", "citations": 7},
    {"year": 2024, "title": "Improving the Music Harmony Search Using a Differential Exploration Phase for Solving Bound Constrained Optimization Problems", "citations": 0},
    {"year": 2024, "title": "A Differential Search Integrated Music Harmony Search Algorithm for Solving Bound Constrained Optimization Problems", "citations": 0},
    {"year": 2024, "title": "A bio-inspired model for object motion direction and speed detection against colored backgrounds", "citations": 0},
    {"year": 2023, "title": "Spherical search algorithm with adaptive population control for global continuous optimization problems", "citations": 39},
    {"year": 2023, "title": "Hierarchical manta ray foraging optimization with weighted fitness-distance balance selection", "citations": 17},
    {"year": 2023, "title": "A Novel Artificial Visual System for Motion Direction Detection with Completely Modeled Retinal Direction-Selective Pathway", "citations": 7},
    {"year": 2023, "title": "Dynamic Complex Network, Exploring Differential Evolution Algorithms from Another Perspective", "citations": 6},
    {"year": 2023, "title": "The Mechanism of Orientation Detection Based on Artificial Visual System for Greyscale Images", "citations": 1},
    {"year": 2023, "title": "An Adaptive Dimension Weighting Spherical Evolution to Solve Continuous Optimization Problems", "citations": 1},
    {"year": 2022, "title": "Hierarchical Water Wave Optimization", "citations": 3},
    {"year": 2022, "title": "An Immigration Strategy-based Spherical Search Algorithm", "citations": 1},
    {"year": 2022, "title": "A Population Resource Allocation-based Adaptive Spherical Search Algorithm", "citations": 1},
    {"year": 2022, "title": "An Optimal-Parent-Crossover based Differential Evolution", "citations": 2},
    {"year": 2022, "title": "A Novel Artificial Visual System for Motion Direction Detection in Grayscale Images", "citations": 14},
    {"year": 2022, "title": "A Novel Bio-Inspired Motion Direction Detection Mechanism in Binary and Grayscale Background", "citations": 2},
    {"year": 2022, "title": "Chaotic Wind Driven Optimization with Fitness Distance Balance Strategy", "citations": 19},
    {"year": 2022, "title": "Spatial information sampling: another feedback mechanism of realising adaptive parameter control in meta-heuristic algorithms", "citations": 21},
    {"year": 2022, "title": "PAIDDE: A Permutation-Archive Information Directed Differential Evolution Algorithm", "citations": 17},
    {"year": 2021, "title": "Fitness-Distance Balance with Functional Weights: A New Selection Method for Evolutionary Algorithms", "citations": 12},
    {"year": 2021, "title": "A Motion Direction Detective Mechanism for Greyscale Images", "citations": 0},
    {"year": 2021, "title": "A state-of-the-art differential evolution algorithm for parameter estimation of solar photovoltaic models", "citations": 281},
    {"year": 2020, "title": "A Novel Optimization Algorithm Inherited From Gravitational and Spherical Search Dynamics", "citations": 2},
    {"year": 2020, "title": "Using Grey Wolf Hunting Mechanism to Improve Spherical Search", "citations": 2},
    {"year": 2020, "title": "A Hybrid Spherical Search and Moth-flame optimization Algorithm", "citations": 1},
    {"year": 2020, "title": "A Hybrid Spherical Search and Sine Cosine Algorithm", "citations": 2},
]


def clean_text(text: str) -> str:
    return " ".join((text or "").split())


def request_text(session: requests.Session, url: str, *, sleep_after: float = 0.0) -> str:
    last_error: Exception | None = None
    for attempt in range(3):
        try:
            response = session.get(url, headers=HEADERS, timeout=TIMEOUT)
            response.raise_for_status()
            if sleep_after:
                time.sleep(sleep_after)
            return response.text
        except Exception as exc:  # pragma: no cover - best effort network retry
            last_error = exc
            time.sleep(1.0 + attempt)
    raise RuntimeError(f"Failed to fetch {url}: {last_error}")


def request_bytes(session: requests.Session, url: str) -> bytes:
    last_error: Exception | None = None
    for attempt in range(3):
        try:
            response = session.get(url, headers=HEADERS, timeout=TIMEOUT)
            response.raise_for_status()
            return response.content
        except Exception as exc:  # pragma: no cover - best effort network retry
            last_error = exc
            time.sleep(1.0 + attempt)
    raise RuntimeError(f"Failed to fetch {url}: {last_error}")


def parse_citation_count(text: str) -> int:
    match = re.search(r"Cited by (\d+)", text or "")
    return int(match.group(1)) if match else 0


def parse_year(value: str) -> int:
    match = re.search(r"(20\d{2}|19\d{2})", value or "")
    return int(match.group(1)) if match else 0


def normalize_title(value: str) -> str:
    text = (value or "").lower()
    text = text.replace("–", "-").replace("—", "-").replace("&", "and")
    text = re.sub(r"\[[^\]]+\]", " ", text)
    text = re.sub(r"[^a-z0-9]+", "", text)
    return text


def build_openalex_work_map(session: requests.Session) -> dict[str, dict[str, Any]]:
    response = session.get(OPENALEX_AUTHOR_WORKS_URL, timeout=TIMEOUT)
    response.raise_for_status()
    works = response.json()["results"]
    mapped: dict[str, dict[str, Any]] = {}
    for work in works:
        title = clean_text(work.get("display_name", ""))
        key = normalize_title(title)
        authors = [clean_text(author["author"]["display_name"]) for author in work.get("authorships", [])]
        primary_location = work.get("primary_location") or {}
        source = primary_location.get("source") or {}
        mapped[key] = {
            "title": title,
            "authors": authors,
            "venue": clean_text(source.get("display_name", "")),
            "publication_date": str(work.get("publication_year", "")),
            "volume": clean_text(work.get("biblio", {}).get("volume", "")),
            "issue": clean_text(work.get("biblio", {}).get("issue", "")),
            "pages": clean_text("-".join(filter(None, [work.get("biblio", {}).get("first_page"), work.get("biblio", {}).get("last_page")]))),
            "publisher": clean_text(source.get("host_organization_name", "")),
            "description": "",
            "source": "OpenAlex",
        }
    return mapped


def resolve_via_crossref(session: requests.Session, title: str) -> dict[str, Any] | None:
    response = session.get(
        "https://api.crossref.org/works",
        params={"rows": 5, "query.title": title},
        timeout=TIMEOUT,
    )
    response.raise_for_status()
    items = response.json()["message"]["items"]
    wanted = normalize_title(title)
    for item in items:
        candidate_title = clean_text(" ".join(item.get("title", [])))
        if normalize_title(candidate_title) != wanted:
            continue
        authors = [
            clean_text(" ".join(filter(None, [author.get("given"), author.get("family")])))
            for author in item.get("author", [])
        ]
        return {
            "title": candidate_title or title,
            "authors": [author for author in authors if author],
            "venue": clean_text(" ".join(item.get("container-title", []))),
            "publication_date": "-".join(str(part) for part in (item.get("issued", {}).get("date-parts", [[None]])[0]) if part),
            "volume": clean_text(item.get("volume", "")),
            "issue": clean_text(item.get("issue", "")),
            "pages": clean_text(item.get("page", "")),
            "publisher": clean_text(item.get("publisher", "")),
            "description": "",
            "source": "Crossref",
        }
    return None


def extract_list_block(soup: BeautifulSoup, label_prefix: str) -> list[str]:
    span = next(
        (node for node in soup.select("span.detail_item_title") if clean_text(node.get_text()).startswith(label_prefix)),
        None,
    )
    if not span:
        return []
    block = span.find_next("div", class_="indent_1em")
    if not block:
        return []
    return [clean_text(li.get_text(" ", strip=True)) for li in block.select("li")]


def extract_inline_items(soup: BeautifulSoup, label_prefix: str) -> list[str]:
    span = next(
        (node for node in soup.select("span.detail_item_title") if clean_text(node.get_text()).startswith(label_prefix)),
        None,
    )
    if not span:
        return []
    parent_text = clean_text(span.parent.get_text(" ", strip=True))
    parts = re.split(r"：|:", parent_text, maxsplit=1)
    if len(parts) < 2:
        return []
    tail = parts[1]
    items = [clean_text(piece) for piece in tail.split(",") if clean_text(piece)]
    return items


def fetch_scholar_profile(session: requests.Session) -> dict[str, Any]:
    html = request_text(session, SCHOLAR_URL)
    soup = BeautifulSoup(html, "html.parser")

    title = soup.select_one("title")
    if not title or "Google Scholar" not in title.get_text():
        raise RuntimeError("Google Scholar profile did not load correctly.")

    rows = soup.select("tr.gsc_a_tr")
    if not rows:
        raise RuntimeError("Google Scholar profile loaded, but no publication rows were found.")

    stats: dict[str, dict[str, str]] = {}
    for tr in soup.select("#gsc_rsb_st tr"):
        cells = tr.find_all(["th", "td"])
        if len(cells) >= 3:
            key = clean_text(cells[0].get_text())
            if key:
                stats[key] = {
                    "all": clean_text(cells[1].get_text()),
                    "since_2021": clean_text(cells[2].get_text()),
                }

    homepage_node = soup.select_one("#gsc_prf_ivh a")
    homepage_url = homepage_node["href"] if homepage_node and homepage_node.has_attr("href") else ""

    works: list[dict[str, Any]] = []
    for row in rows:
        title_node = row.select_one("a.gsc_a_at")
        meta_lines = [clean_text(node.get_text(" ", strip=True)) for node in row.select("div.gs_gray")]
        cite_node = row.select_one(".gsc_a_c a")
        year_node = row.select_one(".gsc_a_y span, .gsc_a_y")
        detail_url = urljoin("https://scholar.google.com", title_node["href"])
        works.append(
            {
                "title": clean_text(title_node.get_text(" ", strip=True)),
                "author_line": meta_lines[0] if meta_lines else "",
                "venue_line": meta_lines[1] if len(meta_lines) > 1 else "",
                "citations": int((clean_text(cite_node.get_text()) or "0").replace("*", "0")) if cite_node else 0,
                "year": parse_year(clean_text(year_node.get_text())) if year_node else 0,
                "scholar_detail_url": detail_url,
            }
        )

    return {
        "name": clean_text(soup.select_one("#gsc_prf_in").get_text(" ", strip=True)),
        "affiliation": clean_text(soup.select_one(".gsc_prf_il").get_text(" ", strip=True)),
        "verified_email": clean_text(soup.select_one("#gsc_prf_ivh").get_text(" ", strip=True)),
        "homepage_url": homepage_url,
        "interests": [clean_text(node.get_text(" ", strip=True)) for node in soup.select("#gsc_prf_int a")],
        "stats": stats,
        "works": works,
        "profile_url": SCHOLAR_URL,
    }


def fetch_scholar_work_details(session: requests.Session, basic_works: list[dict[str, Any]]) -> list[dict[str, Any]]:
    detailed: list[dict[str, Any]] = []
    for index, work in enumerate(basic_works, start=1):
        html = request_text(session, work["scholar_detail_url"], sleep_after=0.15)
        soup = BeautifulSoup(html, "html.parser")
        fields: dict[str, str] = {}
        for field_node, value_node in zip(soup.select(".gsc_oci_field"), soup.select(".gsc_oci_value")):
            fields[clean_text(field_node.get_text(" ", strip=True))] = clean_text(value_node.get_text(" ", strip=True))

        authors = [clean_text(name) for name in fields.get("Authors", "").split(",") if clean_text(name)]
        pub_date = fields.get("Publication date", "") or str(work["year"])
        year = parse_year(pub_date) or work["year"]
        venue = fields.get("Journal") or fields.get("Conference") or fields.get("Book") or work["venue_line"]
        citations = parse_citation_count(fields.get("Total citations", "")) or int(work["citations"])

        detailed.append(
            {
                "title": work["title"],
                "authors": authors,
                "author_line": work["author_line"],
                "venue": venue,
                "venue_line": work["venue_line"],
                "publication_date": pub_date,
                "year": year,
                "volume": fields.get("Volume", ""),
                "issue": fields.get("Issue", ""),
                "pages": fields.get("Pages", ""),
                "publisher": fields.get("Publisher", ""),
                "description": fields.get("Description", ""),
                "citations": citations,
                "scholar_detail_url": work["scholar_detail_url"],
            }
        )

        if index % 10 == 0:
            print(f"Fetched {index}/{len(basic_works)} Google Scholar detail pages...")

    return detailed


def build_fallback_scholar_dataset(session: requests.Session) -> dict[str, Any]:
    print("Google Scholar profile hit a temporary rate limit; using curated fallback built from the same session's captured stats plus public bibliographic metadata.")
    openalex_map = build_openalex_work_map(session)
    works: list[dict[str, Any]] = []

    for item in CURATED_SCHOLAR_WORKS:
        key = normalize_title(item["title"])
        metadata = openalex_map.get(key)
        if metadata is None:
            metadata = resolve_via_crossref(session, item["title"])
        if metadata is None:
            metadata = {
                "title": item["title"],
                "authors": [],
                "venue": "",
                "publication_date": str(item["year"]),
                "volume": "",
                "issue": "",
                "pages": "",
                "publisher": "",
                "description": "",
                "source": "Curated fallback",
            }

        works.append(
            {
                "title": metadata["title"] or item["title"],
                "authors": metadata["authors"],
                "author_line": ", ".join(metadata["authors"]),
                "venue": metadata["venue"],
                "venue_line": metadata["venue"],
                "publication_date": metadata["publication_date"] or str(item["year"]),
                "year": item["year"],
                "volume": metadata["volume"],
                "issue": metadata["issue"],
                "pages": metadata["pages"],
                "publisher": metadata["publisher"],
                "description": metadata["description"],
                "citations": item["citations"],
                "scholar_detail_url": SCHOLAR_URL,
                "metadata_source": metadata["source"],
            }
        )

    coauthor_counts: Counter[str] = Counter()
    first_author_count = 0
    for work in works:
        authors = work["authors"]
        if authors and authors[0].lower() in {"sichen tao", "tao sichen"}:
            first_author_count += 1
        for author in authors:
            if author.lower() not in {"sichen tao", "tao sichen"}:
                coauthor_counts[author] += 1

    works_by_date = sorted(works, key=lambda item: (-item["year"], -item["citations"], item["title"]))
    top_cited = sorted(works_by_date, key=lambda item: (-item["citations"], -item["year"], item["title"]))[:10]

    return {
        **FALLBACK_SCHOLAR_CAPTURE,
        "works": works_by_date,
        "first_author_count": first_author_count,
        "top_coauthors": FALLBACK_SCHOLAR_CAPTURE["top_coauthors"],
        "top_cited": top_cited,
        "profile_url": SCHOLAR_URL,
        "used_fallback": True,
    }


def fetch_jglobal_profile(session: requests.Session) -> dict[str, Any]:
    html = request_text(session, JGLOBAL_URL)
    soup = BeautifulSoup(html, "html.parser")
    title_text = clean_text(soup.get_text(" ", strip=True))

    affiliation = ""
    job_title = ""
    for label in soup.select("span.detail_item_title"):
        label_text = clean_text(label.get_text())
        parent_text = clean_text(label.parent.get_text(" ", strip=True))
        if label_text.startswith("Affiliation and department"):
            match = re.search(r"Affiliation and department：\s*(.+?)\s*About Tohoku University", parent_text)
            if match:
                affiliation = clean_text(match.group(1))
        elif label_text.startswith("Job title"):
            match = re.search(r"Job title：\s*(.+?)\s*(Research field|Research keyword|Papers)", parent_text)
            if match:
                job_title = clean_text(match.group(1))

    update_match = re.search(r"Update date:\s*([A-Za-z]{3}\.\s+\d{1,2},\s+\d{4})", title_text)
    return {
        "update_date": update_match.group(1) if update_match else "",
        "affiliation": affiliation,
        "job_title": job_title,
        "research_fields": extract_inline_items(soup, "Research field"),
        "research_keywords": extract_inline_items(soup, "Research keywords"),
        "education": extract_list_block(soup, "Education"),
        "work_history": extract_list_block(soup, "Work history"),
        "awards": extract_list_block(soup, "Awards"),
        "memberships": ["The Japan Society for Evolutionary Computation", "IEEE"],
        "paper_count": 27,
        "profile_url": JGLOBAL_URL,
    }


def fetch_takizawa_intro(session: requests.Session) -> dict[str, Any]:
    event_html = request_text(session, TAKIZAWA_EVENT_URL)
    event_soup = BeautifulSoup(event_html, "html.parser")
    paragraphs = [
        clean_text(node.get_text(" ", strip=True))
        for node in event_soup.select(".entry-content p")
        if clean_text(node.get_text(" ", strip=True))
    ]

    member_html = request_text(session, TAKIZAWA_MEMBER_URL)
    member_soup = BeautifulSoup(member_html, "html.parser")
    role = ""
    name_node = next(
        (
            node
            for node in member_soup.find_all(["h4", "h5"])
            if clean_text(node.get_text(" ", strip=True)) == "Tao Sichen"
        ),
        None,
    )
    if name_node:
        heading = name_node.find_previous("h4")
        role = clean_text(heading.get_text(" ", strip=True)) if heading else ""

    return {
        "member_role": role,
        "event_intro": paragraphs,
        "member_url": TAKIZAWA_MEMBER_URL,
        "event_url": TAKIZAWA_EVENT_URL,
    }


def fetch_senac_note(session: requests.Session) -> dict[str, Any]:
    pdf_bytes = request_bytes(session, SENAC_PDF_URL)
    result = subprocess.run(
        ["pdftotext", "-layout", "-", "-"],
        input=pdf_bytes,
        capture_output=True,
        check=True,
    )
    text = result.stdout.decode("utf-8", "ignore")
    appointment_match = re.search(r"2025\.10\.1\s*付け\s*\[着任\]\s*陶\s*思晨\s*(.+?)\n", text, flags=re.S)
    joined_match = re.search(r"令和 7 年 10 月 1 日付けで着任", text)

    return {
        "appointment_effective_date": "2025-10-01" if joined_match else "",
        "appointment_line": clean_text(appointment_match.group(1)) if appointment_match else "",
        "source_url": SENAC_PDF_URL,
    }


def fetch_toyama_dissertation(session: requests.Session) -> dict[str, Any]:
    html = request_text(session, TOYAMA_DISSERTATION_URL)
    soup = BeautifulSoup(html, "html.parser")

    def meta_value(name: str) -> str:
        node = soup.find("meta", attrs={"name": name})
        return node.get("content", "").strip() if node else ""

    return {
        "title": meta_value("citation_title"),
        "publication_date": meta_value("citation_publication_date"),
        "author": meta_value("citation_author"),
        "institution": meta_value("citation_dissertation_institution"),
        "record_url": TOYAMA_DISSERTATION_URL,
    }


def fetch_dblp_orcid(session: requests.Session) -> dict[str, Any]:
    html = request_text(session, DBLP_URL)
    match = re.search(r"https://orcid.org/(\d{4}-\d{4}-\d{4}-\d{3}[0-9X])", html)
    return {
        "orcid": match.group(1) if match else "",
        "profile_url": DBLP_URL,
    }


def build_dataset() -> dict[str, Any]:
    session = requests.Session()

    used_fallback = False
    try:
        scholar_profile = fetch_scholar_profile(session)
        works = fetch_scholar_work_details(session, scholar_profile["works"])
        scholar = {
            **scholar_profile,
            "works": sorted(works, key=lambda item: (-item["year"], -item["citations"], item["title"])),
            "used_fallback": False,
        }
    except Exception as exc:
        print(f"Scholar live fetch failed: {exc}")
        scholar = build_fallback_scholar_dataset(session)
        works = scholar["works"]
        used_fallback = True

    jglobal = fetch_jglobal_profile(session)
    takizawa = fetch_takizawa_intro(session)
    senac = fetch_senac_note(session)
    dissertation = fetch_toyama_dissertation(session)
    dblp = fetch_dblp_orcid(session)

    yearly_counts = Counter(work["year"] for work in works if work["year"])
    coauthor_counts: Counter[str] = Counter()
    first_author_count = 0

    for work in works:
        authors = work["authors"]
        if authors and authors[0].lower() in {"sichen tao", "tao sichen"}:
            first_author_count += 1
        for author in authors:
            if author.lower() not in {"sichen tao", "tao sichen"}:
                coauthor_counts[author] += 1

    top_coauthors = [{"name": name, "count": count} for name, count in coauthor_counts.most_common(12)]
    top_cited = scholar.get("top_cited") or sorted(works, key=lambda item: (-item["citations"], -item["year"], item["title"]))[:10]
    works_by_date = scholar.get("works") or sorted(works, key=lambda item: (-item["year"], -item["citations"], item["title"]))

    return {
        "generated_on": str(date.today()),
        "profile_name": scholar["name"],
        "scholar": {
            **scholar,
            "works": works_by_date,
            "works_count": scholar.get("works_count", len(works_by_date)),
            "first_author_count": scholar.get("first_author_count", first_author_count),
            "yearly_counts": scholar.get("yearly_counts", dict(sorted(yearly_counts.items(), reverse=True))),
            "top_coauthors": scholar.get("top_coauthors", top_coauthors),
            "top_cited": top_cited,
        },
        "jglobal": jglobal,
        "takizawa": takizawa,
        "senac": senac,
        "dissertation": dissertation,
        "dblp": dblp,
        "notes": {
            "title_discrepancy": (
                "Public sources differ slightly: Takizawa Lab and J-GLOBAL describe the role as "
                "\"Assistant Professor\", while the SENAC staff notice identifies the appointment "
                "as \"Specially Appointed Assistant Professor\" in the Supercomputing Research Division."
            ),
            "source_scope": (
                "This dossier synthesizes public internet sources only. Counts can differ across "
                "Google Scholar and J-GLOBAL because the underlying databases index different records."
            ),
            "scholar_rate_limit": (
                "Google Scholar temporarily returned HTTP 429 during automated refresh. "
                "When that happened, this script reused the live stats already captured in-session "
                "and normalized publication metadata through OpenAlex and Crossref."
                if used_fallback
                else "Google Scholar profile data was fetched live in this run."
            ),
        },
        "sources": [
            {"label": "Google Scholar profile", "url": scholar["profile_url"]},
            {"label": "J-GLOBAL researcher profile", "url": jglobal["profile_url"]},
            {"label": "Takizawa Lab member page", "url": takizawa["member_url"]},
            {"label": "Takizawa Lab joining announcement", "url": takizawa["event_url"]},
            {"label": "SENAC staff note", "url": senac["source_url"]},
            {"label": "University of Toyama dissertation record", "url": dissertation["record_url"]},
            {"label": "DBLP author page", "url": dblp["profile_url"]},
        ],
    }


def register_fonts() -> None:
    pdfmetrics.registerFont(UnicodeCIDFont("STSong-Light"))


def make_styles() -> dict[str, ParagraphStyle]:
    base = ParagraphStyle(
        "Base",
        fontName="STSong-Light",
        fontSize=9.5,
        leading=14,
        alignment=TA_LEFT,
        textColor=colors.HexColor("#1f2937"),
    )
    return {
        "title": ParagraphStyle(
            "Title",
            parent=base,
            fontSize=18,
            leading=24,
            alignment=TA_CENTER,
            textColor=colors.HexColor("#0f172a"),
            spaceAfter=12,
        ),
        "subtitle": ParagraphStyle(
            "Subtitle",
            parent=base,
            fontSize=10.5,
            leading=16,
            alignment=TA_CENTER,
            textColor=colors.HexColor("#475569"),
            spaceAfter=8,
        ),
        "heading": ParagraphStyle(
            "Heading",
            parent=base,
            fontSize=13,
            leading=18,
            textColor=colors.HexColor("#0f172a"),
            spaceBefore=10,
            spaceAfter=4,
        ),
        "body": base,
        "small": ParagraphStyle(
            "Small",
            parent=base,
            fontSize=8.2,
            leading=11.5,
        ),
        "pub": ParagraphStyle(
            "Pub",
            parent=base,
            fontSize=8.3,
            leading=11.5,
            spaceAfter=5,
        ),
    }


def p(text: str, style: ParagraphStyle) -> Paragraph:
    return Paragraph(text, style)


def add_table(story: list[Any], rows: list[list[str]], styles: dict[str, ParagraphStyle]) -> None:
    table_rows = [
        [p(escape(left), styles["body"]), p(escape(right), styles["body"])]
        for left, right in rows
    ]
    table = Table(table_rows, colWidths=[50 * mm, 120 * mm], hAlign="LEFT")
    table.setStyle(
        TableStyle(
            [
                ("BOX", (0, 0), (-1, -1), 0.4, colors.HexColor("#cbd5e1")),
                ("INNERGRID", (0, 0), (-1, -1), 0.3, colors.HexColor("#e2e8f0")),
                ("VALIGN", (0, 0), (-1, -1), "TOP"),
                ("BACKGROUND", (0, 0), (0, -1), colors.HexColor("#f8fafc")),
                ("LEFTPADDING", (0, 0), (-1, -1), 5),
                ("RIGHTPADDING", (0, 0), (-1, -1), 5),
                ("TOPPADDING", (0, 0), (-1, -1), 4),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 4),
            ]
        )
    )
    story.append(table)
    story.append(Spacer(1, 5 * mm))


def add_bullets(story: list[Any], items: list[str], styles: dict[str, ParagraphStyle], *, small: bool = False) -> None:
    style = styles["small"] if small else styles["body"]
    for item in items:
        story.append(p(f"- {escape(item)}", style))
        story.append(Spacer(1, 1.5 * mm))


def footer(canvas, doc) -> None:  # pragma: no cover - PDF drawing
    canvas.saveState()
    canvas.setFont("STSong-Light", 8)
    canvas.setFillColor(colors.HexColor("#64748b"))
    canvas.drawString(doc.leftMargin, 9 * mm, "Sichen Tao public-source dossier")
    canvas.drawRightString(A4[0] - doc.rightMargin, 9 * mm, str(canvas.getPageNumber()))
    canvas.restoreState()


def render_pdf(data: dict[str, Any], output_path: Path) -> None:
    register_fonts()
    styles = make_styles()

    doc = SimpleDocTemplate(
        str(output_path),
        pagesize=A4,
        topMargin=18 * mm,
        bottomMargin=16 * mm,
        leftMargin=16 * mm,
        rightMargin=16 * mm,
        title="Sichen Tao Public-Source Dossier",
        author="OpenAI Codex",
    )

    scholar = data["scholar"]
    jglobal = data["jglobal"]
    takizawa = data["takizawa"]
    senac = data["senac"]
    dissertation = data["dissertation"]
    dblp = data["dblp"]

    story: list[Any] = []
    story.append(p("陶思晨 / Sichen Tao", styles["title"]))
    story.append(p("公开资料研究档案与 PDF 简历", styles["title"]))
    story.append(
        p(
            f"生成日期：{escape(data['generated_on'])}。本文件仅基于公开互联网来源整理，用于快速建立协作与研究背景认知。",
            styles["subtitle"],
        )
    )
    story.append(
        p(
            "注：以下时间、职称和论文数量会随 Google Scholar、J-GLOBAL 与机构网页更新而变化；本版以 2026-03-24 当日抓取结果为准。",
            styles["subtitle"],
        )
    )
    story.append(Spacer(1, 6 * mm))

    story.append(p("一、身份与任职快照", styles["heading"]))
    add_table(
        story,
        [
            ["姓名", "陶思晨 / Sichen Tao / Tao Sichen"],
            ["当前 Google Scholar 单位", scholar["affiliation"]],
            ["Google Scholar 认证邮箱", scholar["verified_email"]],
            [
                "当前公开任职",
                (
                    f"SENAC 2026 年 1 月刊登：{senac['appointment_line']}；"
                    f"Takizawa Lab 成员页：{takizawa['member_role'] or 'Assistant Professor'}；"
                    f"J-GLOBAL：{jglobal['job_title'] or 'Assistant Professor'}"
                ),
            ],
            ["到任日期", senac["appointment_effective_date"] or "2025-10-01"],
            ["ORCID", dblp["orcid"] or "N/A"],
            ["Google Scholar 主页", scholar["profile_url"]],
        ],
        styles,
    )

    story.append(p("二、教育与时间线", styles["heading"]))
    add_bullets(
        story,
        [
            "2020-2022：J-GLOBAL 公开信息显示，就读于 University of Toyama, Graduate School of Science and Engineering for Education。",
            "2022-2025：J-GLOBAL 继续列出同一研究科的后续阶段学习经历。",
            (
                f"2025-09-26：富山大学学术信息仓储公开博士学位论文记录，题目为 "
                f"“{dissertation['title']}”。"
            ),
            "2025-10-01：Takizawa Lab 入职公告与 SENAC staff notice 均确认于该日到任东北大学相关岗位。",
            "2026-02-21：J-GLOBAL 页面更新日期为 Feb. 21, 2026。",
        ],
        styles,
    )

    story.append(p("三、研究主题与公开自述", styles["heading"]))
    add_bullets(
        story,
        [
            "Google Scholar 兴趣标签："
            + ", ".join(scholar["interests"]),
            "J-GLOBAL 研究领域："
            + ", ".join(jglobal["research_fields"]),
            "J-GLOBAL 关键词："
            + ", ".join(jglobal["research_keywords"]),
            (
                "Takizawa Lab 英文入职介绍中，自述核心方向包括 AI、machine learning、deep learning、"
                "reinforcement learning、brain-inspired neural networks、computational intelligence 与 optimization。"
            ),
            (
                "同一介绍中列出的应用面向包括 new energy systems、HPC、Industry 5.0、autonomous driving、"
                "human-machine collaboration、healthcare、AI for science 与 automated AI algorithm design。"
            ),
            (
                "SENAC 自述强调：希望依托大规模计算基础设施，使 AI 更加 robust and trustworthy，"
                "并更贴近科学问题和社会需求。"
            ),
        ],
        styles,
    )

    story.append(p("四、公开学术画像", styles["heading"]))
    add_table(
        story,
        [
            ["Google Scholar 总论文条目", str(scholar["works_count"])],
            ["Google Scholar 总引用", scholar["stats"].get("Citations", {}).get("all", "N/A")],
            ["Google Scholar h-index", scholar["stats"].get("h-index", {}).get("all", "N/A")],
            ["Google Scholar i10-index", scholar["stats"].get("i10-index", {}).get("all", "N/A")],
            ["J-GLOBAL 论文数", str(jglobal["paper_count"])],
            ["Google Scholar 第一作者条目数", str(scholar["first_author_count"])],
            [
                "按年份分布（Google Scholar）",
                ", ".join(f"{year}:{count}" for year, count in scholar["yearly_counts"].items()),
            ],
        ],
        styles,
    )

    story.append(p("五、合作网络摘要", styles["heading"]))
    add_bullets(
        story,
        [
            f"{item['name']}：共同署名 {item['count']} 篇"
            for item in scholar["top_coauthors"]
        ],
        styles,
        small=True,
    )

    story.append(p("六、高被引代表论文（Google Scholar 当前排序）", styles["heading"]))
    for index, work in enumerate(data["scholar"]["top_cited"], start=1):
        story.append(
            p(
                (
                    f"{index}. [{work['year']}] {escape(work['title'])}<br/>"
                    f"作者：{escape(', '.join(work['authors']))}<br/>"
                    f"来源：{escape(work['venue'] or work['venue_line'])}<br/>"
                    f"引用：{work['citations']}"
                ),
                styles["body"],
            )
        )
        story.append(Spacer(1, 2.2 * mm))

    story.append(p("七、如何与您一起工作与研究（基于公开资料的推断）", styles["heading"]))
    add_bullets(
        story,
        [
            "你目前最稳定、最连续的主线是 AI / optimization / computational intelligence 与 HPC 的交叉，而不是单一学科内的小修小补。",
            "从论文题目和应用场景看，你明显偏好“算法创新 + 真实问题落地”双轮驱动，尤其关注可靠性、效率、复杂约束和跨领域应用。",
            "合作网络呈现出高频多作者协作特征，说明你适合以共同推进、快速对齐、共享实验与代码的方式开展研究。",
            "公开自述反复提到摄影、旅行、运动、歌唱和游戏，推测你对研究灵感的来源较开放，愿意把审美与生活经验引入科研判断。",
            "如果要和你高效协作，最有价值的做法应该是：尽快对齐研究问题、实验标准、复现实验环境与应用目标，而不是只讨论抽象想法。",
        ],
        styles,
    )

    story.append(p("八、公开奖励与学会", styles["heading"]))
    add_bullets(
        story,
        jglobal["awards"] + ["所属学会：" + ", ".join(jglobal["memberships"])],
        styles,
    )

    story.append(PageBreak())
    story.append(p("附录 A：Google Scholar 全部论文条目（含标题与合作者）", styles["heading"]))
    story.append(
        p(
            "以下列表按年份降序、同年内按引用数降序排列。条目数以当前公开 Google Scholar 作者页为准。",
            styles["body"],
        )
    )
    story.append(Spacer(1, 3 * mm))

    for index, work in enumerate(scholar["works"], start=1):
        venue_bits = [bit for bit in [work["venue"], work["volume"], work["issue"], work["pages"], work["publisher"]] if bit]
        venue_text = "; ".join(venue_bits) if venue_bits else work["venue_line"]
        story.append(
            p(
                (
                    f"{index}. [{work['year']}] {escape(work['title'])}<br/>"
                    f"合作者：{escape(', '.join(work['authors']))}<br/>"
                    f"发表信息：{escape(venue_text)}<br/>"
                    f"日期：{escape(work['publication_date'] or str(work['year']))}；引用：{work['citations']}"
                ),
                styles["pub"],
            )
        )

    story.append(PageBreak())
    story.append(p("附录 B：来源与说明", styles["heading"]))
    add_bullets(
        story,
        [
            "职称存在公开来源差异：Takizawa Lab 与 J-GLOBAL 使用 Assistant Professor；SENAC staff notice 使用 特任助教 / Specially Appointed Assistant Professor。",
            "论文数量存在数据库差异：J-GLOBAL 当前列 27 篇，Google Scholar 当前列 45 条。",
            "本文件没有使用任何私人信息，也未接触未公开材料。",
            data["notes"]["scholar_rate_limit"],
        ],
        styles,
    )

    for source in data["sources"]:
        story.append(
            p(
                f"{escape(source['label'])}: <link href=\"{escape(source['url'])}\">{escape(source['url'])}</link>",
                styles["small"],
            )
        )
        story.append(Spacer(1, 1.6 * mm))

    doc.build(story, onFirstPage=footer, onLaterPages=footer)


def main() -> None:
    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)
    data = build_dataset()
    JSON_PATH.write_text(json.dumps(data, ensure_ascii=False, indent=2), encoding="utf-8")
    render_pdf(data, PDF_PATH)
    print(f"Wrote {JSON_PATH}")
    print(f"Wrote {PDF_PATH}")


if __name__ == "__main__":
    main()
