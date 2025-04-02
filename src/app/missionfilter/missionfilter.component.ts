import { Component } from "@angular/core";
import { Mission } from "../models/mission";
import { SpacexapiService } from "../network/spacexapi.service";
import { Router } from "@angular/router";

@Component({
    selector: "app-missionfilter",
    standalone: true,
    imports: [],
    templateUrl: "./missionfilter.component.html",
})
export class MissionfilterComponent {
    #api: SpacexapiService = new SpacexapiService();
    #data: Mission[] = [];
    filteredData: Mission[] = [];
    years: number[] = [];
    selectedYear: number | null = null;
    selectedLaunchSuccess: boolean | null = null;
    selectedLandingSuccess: boolean | null = null;

    constructor(private router: Router) {
        this.#api.getLaunches().then((res) => (this.data = res));
    }

    onSeeMoreClick(mission: Mission) {
        this.router.navigate(["/missiondetails"], {
            queryParams: { id: mission.flight_number },
        });
    }

    filterYear(year: number | null) {
        if (year === this.selectedYear) year = null;

        if (!year) {
            this.filteredData = this.#data;
            this.selectedYear = null;
            return;
        }

        this.selectedYear = year;
        this.#api
            .filterLaunches(year)
            .then((res) => (this.filteredData = res));
    }

    filterLaunchSuccess(success: boolean | null) {
        if (success === this.selectedLaunchSuccess) success = null;

        if (success === null) {
            this.filteredData = this.#data;
            this.selectedLaunchSuccess = null;
            return;
        }

        this.selectedLaunchSuccess = success;
        this.filteredData = this.#data.filter((mission) => { 
            return mission.launch_success === success;
        });
    }

    filterLandingSuccess(success: boolean | null) {
        if (success === this.selectedLandingSuccess) success = null;

        if (success === null) {
            this.filteredData = this.#data;
            this.selectedLandingSuccess = null;
            return;
        }

        this.selectedLandingSuccess = success;
        this.filteredData = this.#data.filter((mission) => {
            return mission.rocket.first_stage.cores.every((core) => {
                return core.land_success === success;
            });
        });
    }

    set data(value: Mission[]) {
        this.#data = value;
        this.filteredData = value;
        this.years = Array.from(
            new Set<number>(value.map((mission) => parseInt(mission.launch_year, 10)))
        );
    }

    get data() {
        return this.#data;
    }
}
