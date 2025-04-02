import { Component } from "@angular/core";
import { SpacexapiService } from "../network/spacexapi.service";
import { Mission } from "../models/mission";
import { Router } from "@angular/router";

@Component({
    selector: "app-missionlist",
    standalone: true,
    imports: [],
    templateUrl: "./missionlist.component.html",
})
export class MissionlistComponent {
    launches_data: Mission[] = [];
    router: Router;

    constructor(_router: Router) {
        this.router = _router;
        setTimeout(() => {
            const api = new SpacexapiService();
            api.getLaunches().then((res) => (this.launches_data = res));
        }, 200);
    }

    handleClick(item: Mission) {
        this.router.navigate(["missiondetails"], { state: { item } });
    }
}
