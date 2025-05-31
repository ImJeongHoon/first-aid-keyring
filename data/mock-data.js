// 임시 데이터 (실제 서비스에서는 API를 통해 가져올 예정)

// 응급 처치 가이드 데이터
export const emergencyGuides = [
  {
    id: "cpr",
    title: "심폐소생술(CPR)",
    icon: "heart",
    color: "red",
    steps: [
      {
        title: "의식 확인",
        description: "환자의 어깨를 가볍게 두드리며 '괜찮으세요?'라고 물어봅니다.",
        image: "/cpr-check-consciousness.png",
      },
      {
        title: "도움 요청",
        description: "주변 사람에게 119 신고를 요청하고 AED를 가져오도록 합니다.",
        image: "/cpr-call-help.png",
      },
      {
        title: "호흡 확인",
        description: "환자의 가슴 움직임을 보고 호흡이 있는지 10초 이내로 확인합니다.",
        image: "/cpr-check-breathing.png",
      },
      {
        title: "가슴 압박",
        description:
          "양손을 겹쳐 가슴 중앙에 놓고, 분당 100-120회 속도로 5-6cm 깊이로 압박합니다. 30회 압박 후 2회 인공호흡을 반복합니다.",
        image: "/cpr-chest-compression.png",
      },
      {
        title: "AED 사용",
        description:
          "AED가 도착하면 전원을 켜고 패드를 부착한 후 안내에 따라 사용합니다. 충격 전달 시 아무도 환자에게 닿지 않도록 합니다.",
        image: "/cpr-use-aed.png",
      },
    ],
  },
  {
    id: "choking",
    title: "기도 폐쇄(하임리히법)",
    icon: "lungs",
    color: "blue",
    steps: [
      {
        title: "상태 확인",
        description: "환자가 말을 못하거나, 기침을 할 수 없거나, 얼굴이 파랗게 변하는지 확인합니다.",
        image: "/choking-check.png",
      },
      {
        title: "자세 잡기",
        description: "환자의 뒤에 서서 양팔로 환자의 복부를 감쌉니다.",
        image: "/heimlich-position.png",
      },
      {
        title: "하임리히법 시행",
        description:
          "한 손은 주먹을 쥐고 엄지를 배꼽과 명치 사이에 위치시킵니다. 다른 손으로 주먹 쥔 손을 감싸고 빠르게 안쪽 위로 밀어 올립니다.",
        image: "/heimlich-maneuver.png",
      },
      {
        title: "반복 시행",
        description: "이물질이 나올 때까지 반복합니다. 환자가 의식을 잃으면 CPR을 시작합니다.",
        image: "/heimlich-repeat.png",
      },
    ],
  },
  {
    id: "bleeding",
    title: "심한 출혈",
    icon: "droplet",
    color: "red",
    steps: [
      {
        title: "직접 압박",
        description: "깨끗한 천이나 거즈로 출혈 부위를 직접 압박합니다.",
        image: "/bleeding-wound-direct-pressure.png",
      },
      {
        title: "압박 유지",
        description: "출혈이 멈출 때까지 최소 15분 이상 지속적으로 압박합니다.",
        image: "/direct-pressure-wound.png",
      },
      {
        title: "환자 자세",
        description: "가능하면 출혈 부위를 심장보다 높게 유지합니다.",
        image: "/bleeding-elevate.png",
      },
      {
        title: "지혈대 사용",
        description: "직접 압박으로 출혈이 멈추지 않는 경우에만 지혈대를 사용합니다. 지혈대 적용 시간을 기록해 둡니다.",
        image: "/bleeding-tourniquet.png",
      },
    ],
  },
  {
    id: "burns",
    title: "화상",
    icon: "flame",
    color: "orange",
    steps: [
      {
        title: "화상 원인 제거",
        description: "화상 원인으로부터 환자를 안전하게 분리합니다. 불에 탄 옷은 제거합니다.",
        image: "/burn-remove-source.png",
      },
      {
        title: "차가운 물로 식히기",
        description: "화상 부위를 10-20분간 차가운 물(15-25°C)로 식힙니다. 얼음은 직접 대지 않습니다.",
        image: "/burn-treatment-cool-water.png",
      },
      {
        title: "화상 부위 보호",
        description: "깨끗한 천이나 거즈로 화상 부위를 느슨하게 덮습니다. 물집은 터뜨리지 않습니다.",
        image: "/burn-cover-wound.png",
      },
      {
        title: "의료기관 방문",
        description: "2도 이상의 화상, 얼굴/손/발/생식기 화상, 넓은 부위의 화상은 반드시 의료기관을 방문합니다.",
        image: "/burn-seek-medical-help.png",
      },
    ],
  },
  {
    id: "fracture",
    title: "골절",
    icon: "bone",
    color: "purple",
    steps: [
      {
        title: "상태 확인",
        description: "부상 부위의 통증, 부종, 변형, 움직임 제한 등을 확인합니다.",
        image: "/fracture-check.png",
      },
      {
        title: "부상 부위 고정",
        description: "부상 부위를 움직이지 않도록 합니다. 가능하면 부목을 사용해 고정합니다.",
        image: "/fracture-splinting.png",
      },
      {
        title: "냉찜질",
        description: "부종을 줄이기 위해 얼음팩을 수건으로 감싸 부상 부위에 15-20분간 대줍니다.",
        image: "/fracture-ice.png",
      },
      {
        title: "의료기관 방문",
        description: "골절이 의심되면 반드시 의료기관을 방문하여 X-ray 등 정확한 진단을 받습니다.",
        image: "/fracture-medical-help.png",
      },
    ],
  },
  {
    id: "stroke",
    title: "뇌졸중",
    icon: "brain",
    color: "pink",
    steps: [
      {
        title: "FAST 방법으로 확인",
        description:
          "F(Face): 얼굴 한쪽이 처짐, A(Arm): 한쪽 팔이 힘이 없음, S(Speech): 말이 어눌함, T(Time): 증상 발생 시간 확인",
        image: "/fast-stroke-recognition.png",
      },
      {
        title: "119 신고",
        description: "뇌졸중이 의심되면 즉시 119에 신고합니다. 골든타임은 3시간 이내입니다.",
        image: "/stroke-call-119.png",
      },
      {
        title: "자세 조정",
        description: "환자의 상체를 약간 높이고 편안하게 해줍니다. 음식이나 약을 주지 않습니다.",
        image: "/stroke-position.png",
      },
      {
        title: "상태 관찰",
        description: "의식 상태, 호흡, 맥박을 지속적으로 관찰하고 구급대원에게 증상 발생 시간을 알립니다.",
        image: "/stroke-monitor.png",
      },
    ],
  },
]

// 환자 정보 데이터
export const mockPatients = {
  12345: {
    name: "홍길동",
    birthdate: "1980-05-15",
    age: 43,
    gender: "남성",
    bloodType: "A+",
    allergies: "페니실린, 해산물",
    medications: "고혈압약(아모잘탄정 5/50mg) 1일 1회",
    conditions: "고혈압, 당뇨병",
    notes: "최근 심장 스텐트 시술(2022년 3월)",
    emergencyContact: "홍길순(배우자)",
    emergencyPhone: "010-1234-5678",
  },
  23456: {
    name: "김영희",
    birthdate: "1992-11-23",
    age: 31,
    gender: "여성",
    bloodType: "O+",
    allergies: "아스피린",
    medications: "없음",
    conditions: "천식",
    notes: "발작 시 휴대용 흡입기 사용",
    emergencyContact: "김철수(형제)",
    emergencyPhone: "010-2345-6789",
  },
  34567: {
    name: "이민수",
    birthdate: "1975-08-30",
    age: 48,
    gender: "남성",
    bloodType: "B-",
    allergies: "없음",
    medications: "와파린 5mg 1일 1회",
    conditions: "심방세동",
    notes: "항응고제 복용 중으로 출혈 위험이 있음",
    emergencyContact: "이하나(자녀)",
    emergencyPhone: "010-3456-7890",
  },
  45678: {
    name: "박지영",
    birthdate: "1988-02-14",
    age: 35,
    gender: "여성",
    bloodType: "AB+",
    allergies: "라텍스, 땅콩",
    medications: "레보티록신 0.1mg 1일 1회",
    conditions: "갑상선 기능 저하증",
    notes: "심한 땅콩 알레르기(에피펜 휴대)",
    emergencyContact: "박성민(배우자)",
    emergencyPhone: "010-4567-8901",
  },
  56789: {
    name: "최준호",
    birthdate: "1965-12-05",
    age: 58,
    gender: "남성",
    bloodType: "A-",
    allergies: "설파제",
    medications: "메트포르민 500mg 1일 2회, 글리메피리드 2mg 1일 1회",
    conditions: "제2형 당뇨병, 고지혈증",
    notes: "저혈당 발생 가능성 있음",
    emergencyContact: "최미영(배우자)",
    emergencyPhone: "010-5678-9012",
  },
}

// 응급 연락처 데이터
export const emergencyContacts = [
  {
    id: "119",
    name: "119 응급구조대",
    phone: "119",
    description: "화재, 구조, 구급 등 모든 응급상황",
  },
  {
    id: "112",
    name: "112 경찰청",
    phone: "112",
    description: "범죄 신고 및 긴급 상황",
  },
  {
    id: "1339",
    name: "보건복지부 응급의료정보센터",
    phone: "1339",
    description: "응급의료 관련 상담 및 정보",
  },
  {
    id: "129",
    name: "보건복지부 콜센터",
    phone: "129",
    description: "보건복지 관련 종합 상담",
  },
  {
    id: "1577-0199",
    name: "생명의 전화",
    phone: "1577-0199",
    description: "자살 예방 및 정신건강 상담",
  },
]
