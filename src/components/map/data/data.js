import carImg from "../car.png"; // Add vehicle images in public folder
import bikeImg from "../bike.png";
import autoImg from "../auto.png";
import busImg from "../bus.png";
import L from "leaflet";

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
  
const initData =[{"road_name": "highway", "Bus": 0, "Toto": 0, "Auto-Rickshaw": 1, "Car": 1, "HCV": 0, "detection_time": 1739305747, "Bike": 0, "LCV": 0}, {"road_name": "highway", "Bus": 0, "Toto": 0, "Auto-Rickshaw": 6, "Car": 9, "HCV": 0, "detection_time": 1739305752, "Bike": 0, "LCV": 0}, {"road_name": "highway", "Bus": 0, "Toto": 0, "Auto-Rickshaw": 7, "Car": 18, "HCV": 0, "detection_time": 1739305756, "Bike": 4, "LCV": 0}, {"road_name": "highway", "Bus": 1, "Toto": 0, "Auto-Rickshaw": 12, "Car": 21, "HCV": 0, "detection_time": 1739305761, "Bike": 5, "LCV": 0}, {"road_name": "highway", "Bus": 1, "Toto": 0, "Auto-Rickshaw": 18, "Car": 24, "HCV": 0, "detection_time": 1739305765, "Bike": 3, "LCV": 0}, {"road_name": "highway", "Bus": 0, "Toto": 0, "Auto-Rickshaw": 18, "Car": 23, "HCV": 0, "detection_time": 1739305769, "Bike": 2, "LCV": 0}, {"road_name": "highway", "Bus": 1, "Toto": 0, "Auto-Rickshaw": 14, "Car": 23, "HCV": 0, "detection_time": 1739305773, "Bike": 2, "LCV": 0}, {"road_name": "highway", "Bus": 2, "Toto": 0, "Auto-Rickshaw": 13, "Car": 21, "HCV": 0, "detection_time": 1739305777, "Bike": 1, "LCV": 0}, {"road_name": "highway", "Bus": 2, "Toto": 0, "Auto-Rickshaw": 17, "Car": 24, "HCV": 0, "detection_time": 1739305781, "Bike": 4, "LCV": 0}, {"road_name": "highway", "Bus": 3, "Toto": 0, "Auto-Rickshaw": 26, "Car": 21, "HCV": 0, "detection_time": 1739305786, "Bike": 4, "LCV": 0}, {"road_name": "highway", "Bus": 4, "Toto": 0, "Auto-Rickshaw": 24, "Car": 15, "HCV": 1, "detection_time": 1739305790, "Bike": 4, "LCV": 0}, {"road_name": "highway", "Bus": 3, "Toto": 0, "Auto-Rickshaw": 21, "Car": 18, "HCV": 3, "detection_time": 1739305794, "Bike": 4, "LCV": 0}, {"road_name": "highway", "Bus": 6, "Toto": 0, "Auto-Rickshaw": 20, "Car": 22, "HCV": 2, "detection_time": 1739305798, "Bike": 4, "LCV": 0}, {"road_name": "highway", "Bus": 5, "Toto": 0, "Auto-Rickshaw": 18, "Car": 23, "HCV": 0, "detection_time": 1739305802, "Bike": 3, "LCV": 0}, {"road_name": "highway", "Bus": 5, "Toto": 0, "Auto-Rickshaw": 24, "Car": 25, "HCV": 0, "detection_time": 1739305807, "Bike": 2, "LCV": 0}, {"road_name": "highway", "Bus": 1, "Toto": 0, "Auto-Rickshaw": 25, "Car": 24, "HCV": 0, "detection_time": 1739305811, "Bike": 0, "LCV": 0}, {"road_name": "highway", "Bus": 1, "Toto": 0, "Auto-Rickshaw": 21, "Car": 22, "HCV": 0, "detection_time": 1739305815, "Bike": 1, "LCV": 0}, {"road_name": "highway", "Bus": 4, "Toto": 0, "Auto-Rickshaw": 19, "Car": 24, "HCV": 1, "detection_time": 1739305819, "Bike": 2, "LCV": 0}, {"road_name": "highway", "Bus": 3, "Toto": 0, "Auto-Rickshaw": 18, "Car": 25, "HCV": 1, "detection_time": 1739305823, "Bike": 2, "LCV": 0}, {"road_name": "highway", "Bus": 1, "Toto": 0, "Auto-Rickshaw": 20, "Car": 22, "HCV": 2, "detection_time": 1739305827, "Bike": 4, "LCV": 0}, {"road_name": "highway", "Bus": 2, "Toto": 0, "Auto-Rickshaw": 19, "Car": 19, "HCV": 2, "detection_time": 1739305831, "Bike": 9, "LCV": 0}, {"road_name": "highway", "Bus": 4, "Toto": 0, "Auto-Rickshaw": 15, "Car": 19, "HCV": 0, "detection_time": 1739305835, "Bike": 9, "LCV": 0}, {"road_name": "highway", "Bus": 3, "Toto": 0, "Auto-Rickshaw": 13, "Car": 22, "HCV": 0, "detection_time": 1739305839, "Bike": 6, "LCV": 0}, {"road_name": "highway", "Bus": 1, "Toto": 0, "Auto-Rickshaw": 15, "Car": 22, "HCV": 0, "detection_time": 1739305843, "Bike": 3, "LCV": 0}, {"road_name": "highway", "Bus": 4, "Toto": 0, "Auto-Rickshaw": 19, "Car": 16, "HCV": 1, "detection_time": 1739305847, "Bike": 1, "LCV": 0}];

  const vehicleIcons = {
    Car: new L.Icon({ iconUrl: carImg, iconSize: [20, 20] }),
    Bike: new L.Icon({ iconUrl: bikeImg, iconSize: [15, 15] }),
    "Auto-Rickshaw": new L.Icon({ iconUrl: autoImg, iconSize: [18, 18] }),
    Bus: new L.Icon({ iconUrl: busImg, iconSize: [25, 25] }),
    Toto: new L.Icon({ iconUrl: autoImg, iconSize: [25, 25] }),
    HCV: new L.Icon({ iconUrl: busImg, iconSize: [25, 25] }),
    LCV: new L.Icon({ iconUrl: carImg, iconSize: [25, 25] }),
  };
  
  
  const vehicleColors = {
    Car: { color: "red", size: 4 },
    Bike: { color: "blue", size: 4 },
    "Auto-Rickshaw": { color: "green", size: 4 },
    Bus: { color: "orange", size: 4 },
    Toto: { color: "green", size: 4 },
    HCV: { color: "orange", size: 4 },
    LCV: { color: "red", size: 4 },
  };


const legendVehicle = { // because of mismatch of vehicles that we are displaying
    Car: { color: "red", size: 6 },
    Bike: { color: "blue", size: 4 },
    "Auto-Rickshaw": { color: "green", size: 5 },
    Bus: { color: "orange", size: 8 },
};
export {roadPath,initData, roadCenter,vehicleIcons, vehicleColors,legendVehicle}