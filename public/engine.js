const p = {
  PRV: "PRV",
  PSV: "PSV",
  PBV: "PBV",
  FCV: "FCV",
  TCV: "TCV",
  GPV: "GPV"
};
function v(s, i) {
  var m, d, l, P, f;
  const e = i.network.getTime(), n = e.time.toLocaleTimeString("en-US", {
    timeZone: e.timezone,
    hour: "2-digit",
    minute: "2-digit",
    //@ts-ignore
    hourCycle: "h23"
  });
  if (((m = s.simulation) == null ? void 0 : m.status) !== "ACTIVE")
    return {
      id: s.id,
      currentTime: n,
      currentSetting: (d = s.simulation) == null ? void 0 : d.setting,
      currentStatus: (l = s.simulation) == null ? void 0 : l.status,
      pipesInServiceArea: [s.id],
      minCustomerId: void 0,
      minCustomerPressure: void 0,
      minNodeId: void 0,
      minNodePressure: void 0,
      maxCustomerId: void 0,
      maxCustomerPressure: void 0,
      maxNodeId: void 0,
      maxNodePressure: void 0
    };
  const t = i.network.getNeighborAssets(s.id), r = C(t, i), u = i.network.getConnectedAssets(
    [r],
    (o) => o.type === "Valve" && o.family !== "TCV" || o.type === "Valve" && o.status === "CLOSED" || o.type === "SupplySource" || o.type === "Tank" || o.type === "Pump"
  ), a = u.filter((o) => o.type === "Pipe").map((o) => o.id), c = V(u);
  return {
    id: s.id,
    currentSetting: (P = s.simulation) == null ? void 0 : P.setting,
    currentStatus: (f = s.simulation) == null ? void 0 : f.status,
    currentTime: n,
    pipesInServiceArea: a,
    //assestsInServiceArea: connectedAssets,
    ...c
  };
}
function C(s, i) {
  const e = s.map(
    (t) => i.network.getNeighborAssets(t.id).filter((r) => r.type === "Junction")
  ).flat();
  return e.reduce(
    (t, r) => {
      if (!t.simulation || !r.simulation)
        return t;
      const u = r.elevation, a = r.simulation.pressure, c = t.elevation, m = t.simulation.pressure;
      return u + a < c + m ? r : t;
    },
    e[0]
  ).id;
}
function V(s) {
  var a, c, m, d;
  const i = s.filter(
    (l) => l.group === "customerPoint"
  ), e = s.filter((l) => l.type === "Junction"), n = g(i), t = g(e), r = g(i, !1), u = g(e, !1);
  return {
    minCustomerId: n.id,
    minCustomerPressure: (a = n.simulation) == null ? void 0 : a.pressure,
    minNodeId: t.id,
    minNodePressure: (c = t.simulation) == null ? void 0 : c.pressure,
    maxCustomerId: r.id,
    maxCustomerPressure: (m = r.simulation) == null ? void 0 : m.pressure,
    maxNodeId: u.id,
    maxNodePressure: (d = u.simulation) == null ? void 0 : d.pressure
  };
}
function g(s, i = !0) {
  return s.reduce((e, n) => {
    if (!e.simulation)
      return n;
    if (!n.simulation)
      return e;
    const t = e.simulation.pressure < n.simulation.pressure;
    return i ? t ? e : n : t ? n : e;
  });
}
class S {
  run(i) {
    const n = i.network.getValves(
      (t) => t.family === p.PRV && !!t.simulation
    ).map((t) => v(t, i));
    i.ui.sendMessage({
      event: "service-areas",
      serviceAreas: n
    });
  }
  onMessage(i, e) {
    switch (e.event) {
      case "highlight-assets":
        return i.map.setHighlights(e.assets);
      case "move-to-assets":
        return i.map.fitTo(e.assets, {
          flightDuration: 5e3,
          maxZoom: 20,
          padding: {
            top: 100,
            right: 100,
            bottom: 100,
            left: 100
          }
        });
      case "valve-setting":
        return i.network.setSetting(e.valveId, e.setting);
      default:
        return;
    }
  }
}
register(new S());
