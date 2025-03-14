
// Define a single road path (latitude, longitude)
const roadPath = [
    [11.320013, 75.932733],
    [11.320042, 75.932760],
    [11.320072, 75.932788],
    [11.320102, 75.932815],
    [11.320132, 75.932843],
    [11.320162, 75.932870],
    [11.320192, 75.932898],
    [11.320222, 75.932925],
    [11.320252, 75.932953],
    [11.320282, 75.932980],
    [11.320312, 75.933008],
    [11.320342, 75.933035],
    [11.320372, 75.933063],
    [11.320402, 75.933090],
    [11.320432, 75.933118],
    [11.320462, 75.933145],
    [11.320492, 75.933173],
    [11.320522, 75.933200],
    [11.320552, 75.933228],
    [11.320582, 75.933255],
    [11.320612, 75.933283],
    [11.320642, 75.933310],
    [11.320672, 75.933338],
    [11.320702, 75.933365],
    [11.320732, 75.933393],
    [11.320761, 75.933420],
    [11.320791, 75.933448],
    [11.320821, 75.933475],
    [11.320851, 75.933503],
    [11.320881, 75.933530],
    [11.320911, 75.933558],
    [11.320941, 75.933585],
    [11.320971, 75.933613],
    [11.321001, 75.933640],
    [11.321031, 75.933668],
    [11.321061, 75.933695],
    [11.321091, 75.933723],
    [11.321121, 75.933750],
    [11.321151, 75.933778],
    [11.321181, 75.933805],
    [11.321211, 75.933833],
    [11.321241, 75.933860],
    [11.321271, 75.933888],
    [11.321301, 75.933915],
    [11.321331, 75.933943],
    [11.321361, 75.933970],
    [11.321391, 75.933998],
    [11.321421, 75.934025],
    [11.321451, 75.934053],
    [11.321481, 75.934081]
  ];

const roadCenter = [11.320747, 75.933407];
  
const initData =[
  {"road_name": "palayam", "bus": 0, "bicycle": 0, "Auto": 3, "car": 0, "truck": 0, "detection_time": 1739305574, "motorcycle": 0},
  {"road_name": "palayam", "bus": 0, "bicycle": 4, "Auto": 6, "car": 1, "truck": 0, "detection_time": 1739305579, "motorcycle": 0},
  {"road_name": "palayam", "bus": 0, "bicycle": 5, "Auto": 11, "car": 1, "truck": 0, "detection_time": 1739305584, "motorcycle": 0}, 
  {"road_name": "palayam", "bus": 2, "bicycle": 2, "Auto": 16, "car": 0, "truck": 0, "detection_time": 1739305588, "motorcycle": 0}
  ];
const initConfig = ["palayam",1739305574000,1739305588000];

  const vehicleColors = {
    car: { color: "red", size: 4 },
    motorcycle: { color: "blue", size: 4 },
    Auto: { color: "green", size: 4 },
    bus: { color: "orange", size: 4 },
    bicycle: { color: "blue", size: 4 },
    truck: { color: "orange", size: 4 },
  };


const legendVehicle = { // because of mismatch of vehicles that we are displaying
    car: { color: "red", size: 6 },
    motorcycle: { color: "blue", size: 4 },
    auto: { color: "green", size: 5 },
    bus: { color: "orange", size: 8 },
};
export {roadPath,initData, roadCenter, vehicleColors,legendVehicle,initConfig}

