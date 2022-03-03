import { makeAutoObservable } from "mobx";

export class VisualizationData {
  data = [];
  graphType = undefined;
  loading = false;
  constructor(graphType) {
    makeAutoObservable(this);
    this.graphType = graphType;
  }

  setData = (val) => (this.data = val);
  load = () => (this.loading = true);
  finish = () => (this.loading = false);

  get isEmpty() {
    return this.data.every((v) => {
      if (this.graphType === "treemap") {
        return v.values.length === 0;
      }

      if (this.graphType === "map") {
        return false;
      }

      if (this.graphType === "line") {
        return v.x.length === 0 && v.y.length === 0;
      }

      if (this.graphType === "bar") {
        return v.x.filter((d) => d !== 0).length !== 0;
      }

      return v.x.filter((s) => s !== 0).length !== 0;
    });
  }
}
