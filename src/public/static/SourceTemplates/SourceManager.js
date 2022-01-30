export default class SourceManager {
    constructor(){
        this.currentTemplate = null;
        this.pfpCacheList = [];
    }

    retrieveFromCache(pfp){
        let cachePtr = this.pfpCacheList.find((element) => {
            return element.asid == pfp.split("?asid=")[1].split("&")[0];
        });

        if(!cachePtr){
            this.pfpCacheList.push({
                asid: pfp.split("?asid=")[1].split("&")[0],
                link: pfp
            });
            return pfp;
        }

        console.log(cachePtr.link);
        return cachePtr.link;
    }

    preloadImage(url){
        let img=new Image();
        img.src=url;
    }

    async render(data){
        if(!data.visible){
            document.getElementsByClassName("root")[0].style.display = "none";
            document.getElementsByClassName("root")[0].innerHTML = "";
            return;
        }

        document.getElementsByClassName("root")[0].style.display = "block";

        await this.includeTempalate(data.template);

        if(data.type == "MessageChat"){
            document.getElementById("name").innerHTML = data.name;
            document.getElementById("pfp").src = data.pfp;
            document.getElementById("message").innerHTML = data.message;

            if(data.platform == "youtube"){
                document.getElementById("icon").src = "/static/images/yt-logo.png";
                document.getElementById("icon").style.marginTop = "0.7rem";
                document.getElementById("icon").style.marginLeft = "-0.45rem";
            } 
            
            if(data.platform == "facebook") {
                document.getElementById("icon").src = "https://image.flaticon.com/icons/png/128/145/145802.png";
                document.getElementById("icon").style.width = "2.1rem";
                document.getElementById("icon").style.height = "2.1rem";
                document.getElementById("icon").style.marginTop = "0.71rem";
                document.getElementById("icon").style.marginLeft = "-0.05rem";
            }

            if(data.platform == "s1live"){
                document.getElementById("icon").src = "/static/images/s1icon.png";
            }
        }

        if(data.type == "SuperChat"){
            document.getElementById("name").innerHTML = data.name;
            document.getElementById("pfp").src = data.pfp;
            document.getElementById("message").innerHTML = data.message;
            document.getElementById("amount").innerHTML = data.amount;
            for(let i=1; i<=7; i++){
                document.getElementById("container").classList.remove("tier" + i);
            }
            if(!data.message){
                document.getElementById("container").classList.add("noSuperchatContent");
            } else {
                document.getElementById("container").classList.remove("noSuperchatContent");
            }
            document.getElementById("container").classList.add("tier" + (data.tier > 7 ? 7 : data.tier));
        }

    }

    includeTempalate(template){
        return new Promise((resolve, reject) => {
            if(this.currentTemplate == template){
                resolve(true);
            } else {
                var xhr = new XMLHttpRequest();
                xhr.onreadystatechange = function() {
                    if (xhr.readyState == 4 && xhr.status == 200) {
                        document.getElementsByClassName("root")[0].innerHTML = xhr.responseText;
                        this.currentTemplate = template;
                        document.getElementById("templateCss").href = '/static/SourceTemplates/' + template + '/index.css';
                        resolve(true);
                    }
                }
                xhr.open('GET', '/static/SourceTemplates/' + template + '/index.html');
                xhr.send();
            }
        });
    }

}