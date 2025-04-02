import { Location } from "@angular/common";
import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { SpacexapiService } from "../network/spacexapi.service";
import { Mission } from "../models/mission";

@Component({
    selector: "app-missiondetails",
    standalone: true,
    imports: [],
    templateUrl: "./missiondetails.component.html",
})
export class MissiondetailsComponent {
    launch_data: Mission | undefined = undefined;

    constructor(private router: Router, private _location: Location) {
        const currentnav = this.router.getCurrentNavigation();
        const navigationState = currentnav?.extras.state;

        if (navigationState && navigationState["item"]) {
            this.launch_data = navigationState["item"];
            return;
        }

        const id = currentnav?.extractedUrl.queryParams["id"];
        if (id) {
            const api = new SpacexapiService();
            api.getLaunchDetails(id).then((res) => {
                this.launch_data = res;
            });
            return;
        }

        this.router.navigate(["missionlist"]);
    }

    backAction() {
        this._location.back();
    }
}
