const classRoom = document.querySelector(".classroom");
let participantName, link, holder, randomColor;



const participantData = [
  {participant: "Tee Topor", url: "https://github.com/dottiffbot/psam5600_netart"},
  {participant: "Ege Uz", url: "https://github.com/dottiffbot/psam5600_netart"},
  {participant: "Munus Shih", url: "https://munusshih.github.io/netart-0101/index.html"},
  {participant: "Andres Galicia Hernandez", url: "https://github.com/dottiffbot/psam5600_netart"},
  {participant: "Yash Goyal", url: "https://goyay790.github.io/current-net-art-0101/"},
  {participant: "Hong Hua", url: "https://studiohuahong.github.io/Hong_Net_Art_0101/index.html"},
  {participant: "Simran Jagnik", url: "https://jagniksimran.github.io/NetArt0101/"},
  {participant: "Ina Kang", url: "https://inakang.github.io/net-art-0101/"},
  {participant: "Yuyuan Jin", url: "https://yuyuanjin.github.io/net-art-yuyuan/index.html"},
  {participant: "Hasan Khalid", url: "https://hasankhalid.github.io/netart-0101/index.html"},
  {participant: "Nina Lahoti", url: "https://ninalahoti.github.io/netart0101/"},
  {participant: "Yeon Seo Lee", url: "https://11384antont.github.io/net-art-0101/"},
  {participant: "Shuhan Lei", url: "https://melodylei22.github.io/net-art-0101/"},
  {participant: "Tanvi Mishra", url: "https://tanvimishra.github.io/net-art-0101/"},
  {participant: "Unnati Shukla", url: "https://illum-unnati.github.io/net-art-0101/"},
  {participant: "KT Son", url: "https://ktsonyj.github.io/netart0101/"},
  {participant: "Roy Yang", url: "https://tota1n00b.github.io/netart/index.html"},
  {participant: "Jiacheng Jiang", url: "https://oneginx.github.io/NetArt0101/"},
  {participant: "Yuxing Yang", url: "https://yuxingyang.github.io/PSAM-5600_Net-Art-0101/index.html"},
  {participant: "Hyacinth Weng", url: "https://pandahya.github.io/netart0101/"},
  {participant: "Jenny Zhu", url: "https://jennyzzhu.github.io/Net-Art-0101/week_one/project_ideas.html"}
]



participantData.forEach(participant => {

  participantName = document.createElement("div")
  holder = document.createElement("div")
  link = document.createElement("a")
  randomColor = Math.floor(Math.random()*16777215).toString(16);
  link.className ='url'
  holder.className = 'holder'
  participantName.className = 'participant'
 
   
  classRoom.appendChild(holder)
  holder.appendChild(link)
  holder.appendChild(participantName)
  
  
  // classRoom.appendChild(participantName)
  // participantName.appendChild(link)

 
  participantName.style.backgroundColor = "#" + randomColor;
 
  
  link.innerHTML = participant.participant
  link.href = participant.url
  link.target = "_blank"

  
})




  

