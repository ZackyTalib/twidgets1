export default class AppSetting {
    constructor(){
        document.getElementById("settingsButton").addEventListener("click", () => {this.buttonClicked();});
        this.settingTemplates = {
            "MessageChat": "s1custom",
            "SuperChat": "s1superchat",
            "SuperSticker": "s1supersticker"
        };
        this.templateOptions = {
            messageChat: [
                {displayName: "S1 Custom", name: "s1custom"}
            ],
            superchat: [
                {displayName: "S1 Superchat", name: "s1superchat"}
            ],
            supersticker: [
                {displayName: "S1 Supersticker", name: "s1supersticker"}
            ]
        }
    }

    parseTutorialData(){
        return new Promise((resolve, reject) => {
            fs.readFile('./src/assets/templates/settings.html', 'utf8' , (err, data) => {
                if (err) {
                  console.error(err)
                  reject(err);
                }
                resolve(data);
            });
        });
    }

    async buttonClicked(){
        Swal.fire({
            html: this.createSettingsPage(),
            grow: "row",
            showConfirmButton: false,
            showCloseButton: true,
            customClass: 'swal-wide'
        });
        this.formOptionChange();
    }

    formOptionChange(){
        for(let i=0; i<document.querySelectorAll(".form-check-input").length; i++){
            document.querySelectorAll(".form-check-input")[i].addEventListener("click", (event) => {
                switch(event.target.getAttribute("name")){
                    case "textMessageOption":
                        this.settingTemplates.MessageChat = event.target.getAttribute("optionname");
                        break;
                    case "superchatOption":
                        this.settingTemplates.SuperChat = event.target.getAttribute("optionname");
                        break;
                    case "superstickerOption":
                        this.settingTemplates.SuperSticker = event.target.getAttribute("optionname");
                        break;
                }
            });
        }
    }

    createSettingsPage(){
        let html = "";
        html += '<div class="optionBlock"><h6>OBS Chat Template: </h6>';
        for(let i=0; i<this.templateOptions.messageChat.length; i++){
            html += this.createOption("textMessageOption", i, this.templateOptions.messageChat[i].displayName, this.templateOptions.messageChat[i].name, (this.settingTemplates.MessageChat==this.templateOptions.messageChat[i].name));
        }
        html += '</div><div class="optionBlock"><h6>OBS Superchat Template: </h6>';
        for(let j=0; j<this.templateOptions.superchat.length; j++){
            html += this.createOption("superchatOption", j, this.templateOptions.superchat[j].displayName, this.templateOptions.superchat[j].name, (this.settingTemplates.SuperChat==this.templateOptions.superchat[j].name));
        }
        html += '</div><div class="optionBlock"><h6>OBS Supersticker Template: </h6>';
        for(let k=0; k<this.templateOptions.supersticker.length; k++){
            html += this.createOption("superstickerOption", k, this.templateOptions.supersticker[k].displayName, this.templateOptions.supersticker[k].name, (this.settingTemplates.SuperSticker==this.templateOptions.supersticker[k].name));
        }
        html += '</div><style>    label {      display: block;        font-size: small;    }    .form-check img {      display: block;  width: 100%;    margin-top: 10px;      margin-bottom: 10px;    }    .form-check {        text-align: left;    }    .optionBlock {        text-align: left;    }    .optionBlock h6 {        margin-bottom: 5px;    }    .optionBlock + .optionBlock {        margin-top: 50px;    }</style>';
        return html;
    }

    createOption(optionType, optionId, optionDisplayName, optionName, checked){
        let html = '<div class="form-check">';
        html += '<input class="form-check-input" type="radio" optionName=' + optionName + ' name="' + optionType + '" id="' + optionType + optionId + '"' + (checked?"checked":"") + '>';
        html += '<label class="form-check-label" for="' + optionType + optionId + '">';
        html += optionDisplayName;
        html += '</label><img src="../assets/images/templateImages/' + optionName + '.png"/></div>';
        return html;
    }
}