import { ref, computed } from 'vue'

export interface Profile {
  name: string
  nameKorean: string
  nameHanja: string
  phone: string
  email: string
}

export interface Education {
  period: string
  title: string
  description?: string
  details?: string[]
}

export interface Project {
  title: string
  period?: string
  description: string
  techStack?: string[]
  link?: string
  highlights?: string[]
}

export interface Award {
  date: string
  title: string
  organization?: string
}

export interface WorkExperience {
  period: string
  company: string
  department: string
  team: string
  projects: Project[]
}

export interface Skill {
  category: string
  items: Array<{
    name: string
    level: number
    icon?: string
  }>
}

const profile = ref<Profile>({
  name: 'Beom-geun Kwak',
  nameKorean: '곽범근',
  nameHanja: '郭 氾 根',
  phone: '010-4186-5643',
  email: 'ggoon0527@naver.com',
})

const introduction = ref(`
머물러 있지 않고 성장하고자 하는 개발자입니다. 빠르게 변화하는 AI & BE 기술을 흐름에 맞춰 지속적으로 배워나가고 적용하여 새로운 경험들을 만들어 내는 것을 좋아하며 그런 과정에서 성장하는 것에 희열을 느낍니다.`)

const education = ref<Education[]>([
  {
    period: '2018. 03 ~ 2019. 11',
    title: '병역 복무 (제주지방경찰청 해안경비단 123의경대) ',
    details: ['만기 제대', '제주해안경비 근무 및 취사병 근무'],
  },
  {
    period: '2021. 03 ~ 2023. 02',
    title: '충북대학교 정보통신공학부 졸업',
    details: [
      '2022. 05 ~ 2022. 12 | 학부연구생',
      '반도체 Probe Test Pin 정상/불량 AI 분석 및 이진 분류 모델링',
      'x-corp 경진대회 참가',
      '2저자 논문 1편',
    ],
  },
  {
    period: '2023. 08 ~ 2024. 01',
    title: 'KT AIVLE School 4기 AI 개발자 트랙 수료',
    description:
      '현직 개발자와 함께하는 기업 실제 데이터 및 사례기반 프로젝트 수행, AI 서비스 개발에 필요한 소프트웨어 역량 교육 프로젝트 8회 경험',
  },
])

const workExperience = ref<WorkExperience[]>([
  {
    period: '2024. 04 ~ 현재',
    company: 'KTcs',
    department: 'AICC사업본부 AICC컨설팅단',
    team: 'AICC솔루션개발팀 AICC데이터그룹',
    projects: [
      {
        title: '게시판 AI Agent 봇 개발',
        period: '2026. 03 ~ 진행 중',
        description: 'LangGraph 기반 멀티노드 AI Agent 아키텍처 설계 및 Master 노드 영역 개발 담당',
        techStack: ['FastAPI', 'LangGraph', 'FastMCP', 'Milvus DB', 'PostgreSQL'],
        highlights: [
          '텍스트 전처리 노드 개발: 정규식 기반 개인정보 마스킹(전화번호·주민번호·카드번호), HTML 태그 제거, 아호코라식(Aho-Corasick) 알고리즘 기반 고위험 키워드 다중 패턴 탐지 및 담당자 이관 처리',
          '의도 분류 노드 개발: RAG Chain 기반 의도 분류(배송·조회·파손배상 등), 용어사전/동의어사전 매핑, 다중 의도 처리 및 Fallback 설계',
          '이미지 분석 필요성 확인 노드 개발: 이미지 업로드 여부·사용자 설정·의도 분류 결과 기반 분석 필요성 판단',
          '이미지 분석 노드 개발: Vision·OCR Tool Calling 형태로 구현, Image RAG 지원',
          '실행 계획 설계 노드 개발: 의도별 허용 도구 목록 및 시나리오/Agent 모드 설정, 다중 의도 병렬 처리 계획 수립, system prompt 동적 생성',
        ],
      },
      {
        title: '개발팀 AI MCP 서버 개발',
        period: '2024. 08 ~ 2024. 10',
        description:
          'FastAPI, LangGraph, FastMCP를 활용한 AI MCP 기반 도구 오케스트레이션 레이어 구축 및 다양한 MCP 툴 개발',
        techStack: [
          'FastAPI',
          'LangGraph',
          'FastMCP',
          'Airflow',
          'Spring Boot',
          'Thymeleaf',
          'PostgreSQL',
          'Milvus DB',
        ],
        highlights: [
          'FastMCP 기반 도구 오케스트레이션 레이어(LangGraph) 표준화',
          'Airflow 기반 RAG 데이터 적재 파이프라인 구축',
          'RDB 조회 툴 개발: PostgreSQL 자연어 쿼리 변환 및 데이터 조회 기능 구현',
          'Word/PPT 문서 자동 생성 툴 개발: python-docx, python-pptx 활용 AI 기반 문서 자동화',
          'GitLab 연동 툴 개발: 이슈·MR 조회·생성·코드 리뷰 등 GitLab API 기반 개발 워크플로우 자동화',
        ],
      },
      {
        title: '지속 학습 AI RAG 챗봇 개발',
        period: '2024. 05 ~ 2024. 07',
        description:
          '서비스 내 KMS(지식관리시스템)의 본문 및 첨부파일 데이터 임베딩 파이프라인 구축',
        techStack: ['FastAPI', 'LangChain', 'Spring Boot', 'Thymeleaf', 'PostgreSQL', 'Milvus DB'],
        highlights: [
          'KMS 본문 및 첨부파일 데이터 임베딩 파이프라인 구축',
          'BE&FE 개발(챗봇 채팅 조회, 임베딩 관리) 업무 담당',
        ],
      },
      {
        title: '상담사 AI 어시스트 개발',
        period: '2024. 02 ~ 2024. 06',
        description:
          '서비스 내 KMS(지식관리시스템) 데이터를 활용한 RAG 기반의 상담사 추천 응답 생성 기능 개발',
        techStack: ['FastAPI', 'LangChain', 'Spring Boot', 'Thymeleaf', 'PostgreSQL', 'Milvus DB'],
        highlights: [
          'RAG 파이프라인 구축: KMS 데이터 임베딩 및 벡터 검색 기반 컨텍스트 생성',
          'SSE를 활용한 실시간 스트리밍 응답 구현으로 사용자 경험 개선',
          '점진적 렌더링 구현 : JSON 응답 리스트(3개)를 개별 수신 즉시 UI 업데이트',
          'Full-stack 개발: Spring Boot 백엔드 + Thymeleaf 프론트엔드 통합 구현',
        ],
      },
      {
        title: 'IT 요청 게시판 개발',
        period: '2024. 09 ~ 2024. 11',
        description: 'DB 테이블 설계, BE&FE 개발을 통한 IT 요청 게시판 시스템 구축',
        techStack: ['Spring Boot', 'Thymeleaf', 'PostgreSQL'],
        highlights: [
          'DB 테이블 설계 및 BE&FE 개발(고객사, 알림, 요청서 작성)',
          '사내 타팀의 개발팀 요청·등록·조회 프로세스 단순화',
          '기록 보관 및 추적 용이성 확보, 개발팀과 타팀 간 협업 원활화',
        ],
      },
      {
        title: 'RAG 기반 AI 서비스 PoC',
        period: '2024. 08 ~ 2024. 12',
        description: 'RAG 데이터 적재 파이프라인 관련 리서치 및 구축을 통한 PoC 개발',
        techStack: ['FastAPI', 'LangChain', 'Streamlit', 'Milvus DB', 'MongoDB'],
        highlights: [
          'RAG 데이터 적재 파이프라인 구축(Load->Split->Embed->Vector store)',
          '자사 서비스 내 신기술 적용 전 검증',
        ],
      },
    ],
  },
])

const skills = ref<Skill[]>([
  {
    category: 'Backend',
    items: [
      { name: 'FastAPI', level: 70 },
      { name: 'Spring Boot', level: 60 },
      { name: 'Flask', level: 50 },
      { name: 'Django', level: 40 },
      { name: 'Node.js + Express', level: 30 },
    ],
  },
  {
    category: 'AI & Data',
    items: [
      { name: 'LangChain', level: 90 },
      { name: 'LangGraph', level: 70 },
      { name: 'TensorFlow', level: 60 },
      { name: 'Scikit-learn', level: 60 },
      { name: 'FastMCP', level: 50 },
    ],
  },
  {
    category: 'Database & Cloud',
    items: [
      { name: 'PostgreSQL', level: 80 },
      { name: 'Milvus DB', level: 60 },
      { name: 'Chroma DB', level: 60 },
      { name: 'MongoDB', level: 30 },
      { name: 'AWS (EC2, S3, EB 등)', level: 30 },
      { name: 'MySQL', level: 30 },
      { name: 'Firebase', level: 30 },
    ],
  },
  {
    category: 'Tools & OS',
    items: [
      { name: 'Windows', level: 80 },
      { name: 'macOS', level: 70 },
      { name: 'Docker', level: 70 },
      { name: 'Docker Compose', level: 70 },
      { name: 'Git', level: 60 },
      { name: 'Linux', level: 50 },
    ],
  },
])

const awards = ref<Award[]>([
  {
    date: '2024. 01',
    title: 'AIVLE School Big Project - 우수상',
  },
  {
    date: '2024. 01',
    title: 'AIVLE School Deans List (성적우수상)',
  },
  {
    date: '2024. 01',
    title: 'AIVLE School 코딩마스터스 - 마스터상',
  },
  {
    date: '2020. 12',
    title: '비즈니스모델 캡스톤 디자인 경진대회 - 장려상',
  },
])

const links = ref({
  blog: 'https://6eomdev.tistory.com/',
  github: 'https://github.com/6eom9eun',
})

export function usePortfolio() {
  return {
    profile: computed(() => profile.value),
    introduction: computed(() => introduction.value),
    education: computed(() => education.value),
    workExperience: computed(() => workExperience.value),
    skills: computed(() => skills.value),
    awards: computed(() => awards.value),
    links: computed(() => links.value),
  }
}
