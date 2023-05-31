import {
  formatToSimpleFormatDD_MM_YYYY_H_M_S,
  toLaravelDatetime,
} from "../helpers/helpers.js";
import axios from "axios";
import CustomizedAxios from "../plugins/axios.js";
const voyageModule = {
  state: {
    voyages: [],
    voyageToEditOrSave: {
      pgb_r_co: null,
      pgb_r_co_reason: null,
      vawgd: false,
      vawsnrog: false,
      dm_y: false,
      dm_g: false,
      hatch_covers_num: 0,
      hatch_covers_num_40: 0,
      hatch_covers_moves: 0, 
      gear_boxes_num: 0,
      gear_boxes_num_40: 0,
      gear_boxes_moves: 0,
      any_hydraulic_couvers: 0,
      first_line_datetime: null,
      vessel_all_fast: null,
      gangway_secured: null,
      lashers_onboard: null,
      num_mooring_r_fore: 0,
      num_mooring_r_aft: 0,
      dwuscfb: false,
      imo_class: false,
      imo_class_ps_onb: null,
      last_lift_from: null,
      last_lift_to: null,
      last_lift_comment: null,
      lf_from: null,
      lf_to: null,
      lf_comment: null,
      agent_onboard_from: null,
      agent_onboard_to: null,
      agent_onboard_comment: null,
      safety_net_gangway_from: null,
      safety_net_gangway_to: null,
      safety_net_gangway_comment: null,
      pilot_onboard_from: null,
      pilot_onboard_to: null,
      pilot_onboard_comment: null,
      tugs_arrived_from: null,
      tugs_arrived_to: null,
      tugs_arrived_comment: null,
      unmooring_forward_from: null,
      unmooring_forward_to: null,
      unmooring_forward_comment: null,
      unmooring_aft_from: null,
      unmooring_aft_to: null,
      unmooring_aft_comment: null,
      last_line_from: null,
      last_line_to: null,
      last_line_comment: null,
      tele: "",
      vessel_id: "",
      id: "",
      comments: null,
      manoeuvre_sequence: "",
      crane_voyages: [],
      other_delays: [],
      vessel: {
        vessel_name: null,
        service: null,
        eta: null,
        etd: null,
        voy_no: null,

        id: null,
      },
    },
    actualVoyages: [
      {
        voy_no: "665689",
        vessel_name: "Gabriel",
        service: "ALAMINA",
        eta: "01/02/2021 12:00:00",
        etd: "03/02/2021 12:00:00",
      },
      {
        voy_no: "98756",
        vessel_name: "ABIR",
        service: "PORTUGAL",
        eta: "13/02/2021 12:00:00",
        etd: "15/02/2021 12:00:00",
      },
    ],
    actionHistory: [],
    shift: "",
  },
  mutations: {
    SET_VOYAGES(state, voyages) {
      state.voyages = voyages;
    },
    ADD_VOYAGE(state, voyage) {
      state.voyages.push(voyage);
    },
    EDIT_VOYAGE(state, voyage) {
      state.voyages = state.voyages.map((e) => {
        if (e.id == voyage.id) return voyage;
        return e;
      });
    },
    DELETE_VOYAGE(state, voyage) {
      state.voyages = state.voyages.filter((e) => e.id != voyage.id);
    },
    SET_VOYAGE_TO_EDIT_SAVE(state, vessel) {
      state.voyageToEditOrSave = state.voyages.filter(
        (e) => e.vessel.id == vessel.id
      )[0];
    },
    SET_ACTUAL_VOYAGE(state, actualVoyages) {
      state.actualVoyages = actualVoyages.map((e) => {
        e.eta = formatToSimpleFormatDD_MM_YYYY_H_M_S(e.eta);
        e.etd = formatToSimpleFormatDD_MM_YYYY_H_M_S(e.etd);
        return e;
      });
    },
    INITIALIZE_VOYAGE_TO_EDIT_SAVE(state) {
      state.voyageToEditOrSave = {
        pgb_r_co: null,
        pgb_r_co_reason: null,
        vawgd: false,
        vawsnrog: false,
        dm_y: false,
        dm_g: false,
        hatch_covers_num: 0,
        hatch_covers_num_40: 0,
        hatch_covers_moves: 0,
        gear_boxes_num: 0,
        gear_boxes_num_40: 0,
        gear_boxes_moves: 0,
        any_hydraulic_couvers: 0,
        first_line_datetime: null,
        vessel_all_fast: null,
        gangway_secured: null,
        lashers_onboard: null,
        num_mooring_r_fore: 0,
        num_mooring_r_aft: 0,
        dwuscfb: false,
        imo_class: false,
        imo_class_ps_onb: null,
        last_lift_from: null,
        last_lift_to: null,
        last_lift_comment: null,
        lf_from: null,
        lf_to: null,
        lf_comment: null,
        agent_onboard_from: null,
        agent_onboard_to: null,
        agent_onboard_comment: null,
        safety_net_gangway_from: null,
        safety_net_gangway_to: null,
        safety_net_gangway_comment: null,
        pilot_onboard_from: null,
        pilot_onboard_to: null,
        pilot_onboard_comment: null,
        tugs_arrived_from: null,
        tugs_arrived_to: null,
        tugs_arrived_comment: null,
        unmooring_forward_from: null,
        unmooring_forward_to: null,
        unmooring_forward_comment: null,
        unmooring_aft_from: null,
        unmooring_aft_to: null,
        unmooring_aft_comment: null,
        last_line_from: null,
        last_line_to: null,
        last_line_comment: null,
        manoeuvre_sequence: "",
        tele: "",
        vessel_id: 14,
        id: "",
        comments: null,
        crane_voyages: [],
        other_delays: [],
        vessel: {
          vessel_name: null,
          service: null,
          eta: null,
          etd: null,
          voy_no: null,

          id: null,
        },
      };
    },
    DAMAGE_CONTAINER_SETTER(state, payload) {
      state.voyageToEditOrSave.dm_y = payload.dm_y;
      state.voyageToEditOrSave.dm_g = payload.dm_g;
      if (payload.imo_class) {
        state.voyageToEditOrSave.imo_class = payload.imo_class;
        state.voyageToEditOrSave.imo_class_ps_onb = payload.imo_class_ps_onb;
      } else {
        state.voyageToEditOrSave.imo_class = "";
        state.voyageToEditOrSave.imo_class_ps_onb = "";
      }
    },
    VESSEL_ARRIVED_WITH_SETTER(state, payload) {
      state.voyageToEditOrSave.vawgd = payload.vawgd;
      state.voyageToEditOrSave.vawsnrog = payload.vawsnrog;
    },
    COMMENTS_SETTER(state, payload) {
      state.voyageToEditOrSave.comments = payload.comments;
    },
    HATCH_COVERS_GEAR_BOXES_SETTER(state, payload) {
      state.voyageToEditOrSave.hatch_covers_num = payload.hatch_covers_num;
      state.voyageToEditOrSave.hatch_covers_num_40 =
        payload.hatch_covers_num_40;
      state.voyageToEditOrSave.hatch_covers_moves = payload.hatch_covers_moves;
      state.voyageToEditOrSave.gear_boxes_num_40 = payload.gear_boxes_num_40;
      state.voyageToEditOrSave.gear_boxes_num = payload.gear_boxes_num;
      state.voyageToEditOrSave.gear_boxes_moves = payload.gear_boxes_moves;
      state.voyageToEditOrSave.any_hydraulic_couvers =
        payload.any_hydraulic_couvers;
    },
    FIRST_LINE_VESSEL_ALL_FAST_SETTER(state, payload) {
      state.voyageToEditOrSave.first_line_datetime =
        payload.first_line_datetime;
      state.voyageToEditOrSave.num_mooring_r_fore = payload.num_mooring_r_fore;
      state.voyageToEditOrSave.vessel_all_fast = payload.vessel_all_fast;
      state.voyageToEditOrSave.num_mooring_r_aft = payload.num_mooring_r_aft;
      state.voyageToEditOrSave.gangway_secured = payload.gangway_secured;
      state.voyageToEditOrSave.lashers_onboard = payload.lashers_onboard;
      state.voyageToEditOrSave.dwuscfb = payload.dwuscfb;
    },
    DISH_GEAR_SHIP_SETTER(state, payload) {
      const exist =
        state.voyageToEditOrSave.crane_voyages.filter(
          (e) => e.crane_id == payload.crane_id
        ).length == 1;
      if (exist) {
        state.voyageToEditOrSave.crane_voyages.map((e) => {
          if (e.crane_id == payload.crane_id) {
            e.dgbohc_bfl_from = payload.dgbohc_bfl_from;
            e.dgbohc_bfl_to = payload.dgbohc_bfl_to;
            e.dgbohc_bfl_num_gb = payload.dgbohc_bfl_num_gb;
            e.dgbohc_bfl_num_hc = payload.dgbohc_bfl_num_hc;
            e.dss_bfl_from = payload.dss_bfl_from;
            e.dss_bfl_to = payload.dss_bfl_to;
            e.dss_bfl_num_sp = payload.dss_bfl_num_sp;
            e.dss_bfl_fb_dnw = payload.dss_bfl_fb_dnw;
            e.dss_bfl_fb = payload.dss_bfl_fb;
            e.cbd = payload.cbd;
          }
          return e;
        });
      } else {
        state.voyageToEditOrSave.crane_voyages.push({
          cbd: payload.cbd,
          dgbohc_bfl_from: payload.dgbohc_bfl_from,
          dgbohc_bfl_to: payload.dgbohc_bfl_to,
          dgbohc_bfl_num_gb: payload.dgbohc_bfl_num_gb,
          dgbohc_bfl_num_hc: payload.dgbohc_bfl_num_hc,
          dss_bfl_from: payload.dss_bfl_from,
          dss_bfl_to: payload.dss_bfl_to,
          dss_bfl_num_sp: payload.dss_bfl_num_sp,
          dss_bfl_fb_dnw: payload.dss_bfl_fb_dnw,
          dss_bfl_fb: payload.dss_bfl_fb,
          crane_id: payload.crane_id,
          ffl: "",
          fll: "",
          sfl: "",
          sll: "",
          tfl: "",
          tll: "",
          fofl: "",
          foll: "",
          fifl: "",
          fill: "",
          sifl: "",
          sill: "",
          sevfl: "",
          sevll: "",
          eifl: "",
          eill: "",
          nfl: "",
          nll: "",
          tenfl: "",
          tenll: "",
          lgbohc_all_from: "",
          lgbohc_all_to: "",
          lgbohc_all_num_gb: "",
          lgbohc_all_hc: "",
          lgbohc_all_inbay: "",
          lgbohc_all_inbay_hatch_covers: "",

          lss_all_from: "",
          lss_all_to: "",
          lss_all_num_ss: "",
          lss_all_ib: "",
          lss_all_ib_lnw: "",
          cbu: "",
          id: "",
          voyage_id: state.voyageToEditOrSave.id,
        });
      }
    },
    DISH_GEAR_SHIP2_SETTER(state, payload) {
      if (payload.pgb_r_co) {
        state.voyageToEditOrSave.pgb_r_co = payload.pgb_r_co;
        state.voyageToEditOrSave.pgb_r_co_reason = payload.pgb_r_co_reason;
      } else {
        state.voyageToEditOrSave.pgb_r_co = "";
        state.voyageToEditOrSave.pgb_r_co_reason = "";
      }

      const exist =
        state.voyageToEditOrSave.crane_voyages.filter(
          (e) => e.crane_id == payload.crane_id
        ).length == 1;
      if (exist) {
        state.voyageToEditOrSave.crane_voyages.map((e) => {
          if (e.crane_id == payload.crane_id) {
            e.lgbohc_all_from = payload.lgbohc_all_from;
            e.lgbohc_all_to = payload.lgbohc_all_to;
            e.lgbohc_all_num_gb = payload.lgbohc_all_num_gb;
            e.lgbohc_all_hc = payload.lgbohc_all_hc;
            e.lgbohc_all_inbay = payload.lgbohc_all_inbay;
            e.lgbohc_all_inbay_hatch_covers =
              payload.lgbohc_all_inbay_hatch_covers;
            e.lss_all_from = payload.lss_all_from;
            e.lss_all_to = payload.lss_all_to;
            e.lss_all_num_ss = payload.lss_all_num_ss;
            e.lss_all_ib = payload.lss_all_ib;
            e.lss_all_ib_lnw = payload.lss_all_ib_lnw;
            e.cbu = payload.cbu;
          }
          return e;
        });
      } else {
        state.voyageToEditOrSave.crane_voyages.push({
          cbd: "",
          dgbohc_bfl_from: "",
          dgbohc_bfl_to: "",
          dgbohc_bfl_num_gb: "",
          dgbohc_bfl_num_hc: "",
          dss_bfl_from: "",
          dss_bfl_to: "",
          dss_bfl_num_sp: "",
          dss_bfl_fb_dnw: "",
          dss_bfl_fb: "",
          crane_id: payload.crane_id,
          ffl: "",
          fll: "",
          sfl: "",
          sll: "",
          tfl: "",
          tll: "",
          fofl: "",
          foll: "",
          fifl: "",
          fill: "",
          sifl: "",
          sill: "",
          sevfl: "",
          sevll: "",
          eifl: "",
          eill: "",
          nfl: "",
          nll: "",
          tenfl: "",
          tenll: "",
          lgbohc_all_from: payload.lgbohc_all_from,
          lgbohc_all_to: payload.lgbohc_all_to,
          lgbohc_all_num_gb: payload.lgbohc_all_num_gb,
          lgbohc_all_hc: payload.lgbohc_all_hc,
          lgbohc_all_inbay: payload.lgbohc_all_inbay,
          lgbohc_all_inbay_hatch_covers: payload.lgbohc_all_inbay_hatch_covers,

          lss_all_from: payload.lss_all_from,
          lss_all_to: payload.lss_all_to,
          lss_all_num_ss: payload.lss_all_num_ss,
          lss_all_ib: payload.lss_all_ib,
          lss_all_ib_lnw: payload.lss_all_ib_lnw,
          cbu: payload.cbu,
          id: "",
          voyage_id: state.voyageToEditOrSave.id,
        });
      }
    },
    LEFT_DELAY_SETTER(state, payload) {
      const exist =
        state.voyageToEditOrSave.crane_voyages.filter(
          (e) => e.crane_id == payload.crane_id
        ).length == 1;
      if (exist) {
        state.voyageToEditOrSave.crane_voyages.map((e) => {
          if (e.crane_id == payload.crane_id) {
            e[payload.liftVarNam] = payload.value;
          }
          return e;
        });
      } else {
        let crane_voyage = {
          cbd: "",
          dgbohc_bfl_from: "",
          dgbohc_bfl_to: "",
          dgbohc_bfl_num_gb: "",
          dgbohc_bfl_num_hc: "",
          dss_bfl_from: "",
          dss_bfl_to: "",
          dss_bfl_num_sp: "",
          dss_bfl_fb_dnw: "",
          dss_bfl_fb: "",
          crane_id: "",
          ffl: "",
          fll: "",
          sfl: "",
          sll: "",
          tfl: "",
          tll: "",
          fofl: "",
          foll: "",
          fifl: "",
          fill: "",
          sifl: "",
          sill: "",
          sevfl: "",
          sevll: "",
          eifl: "",
          eill: "",
          nfl: "",
          nll: "",
          tenfl: "",
          tenll: "",
          lgbohc_all_from: "",
          lgbohc_all_to: "",
          lgbohc_all_num_gb: "",
          lgbohc_all_hc: "",
          lgbohc_all_inbay: "",
          lgbohc_all_inbay_hatch_covers: "",
          lss_all_from: "",
          lss_all_to: "",
          lss_all_num_ss: "",
          lss_all_ib: "",
          lss_all_ib_lnw: "",
          cbu: "",
          id: "",
          voyage_id: state.voyageToEditOrSave.id,
        };
        crane_voyage[payload.liftVarNam] = payload.value;
        crane_voyage.crane_id = payload.crane_id;
        state.voyageToEditOrSave.crane_voyages.push(crane_voyage);
      }
    },
    DELAY_SETTER(state, payload) {
      const exist =
        state.voyageToEditOrSave.other_delays.filter((e) => e.id == payload.id)
          .length == 1;
      if (exist) {
        state.voyageToEditOrSave.other_delays.map((e) => {
          if (e.id == payload.id) {
            e.from = payload.from;
            e.to = payload.to;
            e.reason = payload.reason;
            e.comment = payload.comment;
            e.dep_arr = payload.dep_arr;
            e.crane_id = payload.crane_id;
            e.code_id = payload.code_id;
            e.code = payload.code;
            e.category = payload.category;
            e.voyage_id = state.voyageToEditOrSave.id;
          }
          return e;
        });
      } else {
        state.voyageToEditOrSave.other_delays.push({
          id: "",
          from: payload.from,
          to: payload.to,
          reason: payload.reason,
          comment: payload.comment,
          dep_arr: payload.dep_arr,
          crane_id: payload.crane_id,
          code_id: payload.code_id,
          code: payload.code,
          category: payload.category,
          voyage_id: state.voyageToEditOrSave.id,
        });
      }
    },
    VESSEL_DEPARTURE_SETTER(state, payload) {
      state.voyageToEditOrSave[payload.from] = payload.fromValue;
      state.voyageToEditOrSave[payload.to] = payload.toValue;
      state.voyageToEditOrSave[payload.comment] = payload.commentValue;
    },
    VESSEL_DEPARTURE_SETTER2(state, payload) {
      state.voyageToEditOrSave[payload.to] = payload.toValue;
      state.voyageToEditOrSave[payload.comment] = payload.commentValue;
      state.voyageToEditOrSave.manoeuvre_sequence = payload.manoeuvre_sequence;
    },
    VESSEL_SETTER(state, payload) {
      state.voyageToEditOrSave.vessel.voy_no = payload.voy_no;
      state.voyageToEditOrSave.vessel.vessel_name = payload.vessel_name;
      state.voyageToEditOrSave.vessel.service = payload.service;
      state.voyageToEditOrSave.vessel.eta = payload.eta;
      state.voyageToEditOrSave.vessel.etd = payload.etd;
    },
    SAVE_OR_UPDATE_VOYAGE(state, voyage) {
      state.voyages.push(voyage);
      state.voyageToEditOrSave = voyage;
    },
    SHIFT_SETTER(state, payload) {
      state.shift = payload.shift;
    },
    DELETE_OTHER_DELAY(state, otherDelay) {
      state.voyageToEditOrSave.other_delays =
        state.voyageToEditOrSave.other_delays.filter((d) => {
          return d.id != otherDelay.id;
        });
    },
    SET_ACTION_HISTORY(state, actionHistory) {
      state.actionHistory = actionHistory.map((e) => {
        return {
          firstname: e.utilisateur.firstname,
          lastname: e.utilisateur.lastname,
          username: e.utilisateur.username,
          action: e.actionType,
          date: e.created_at,
          shift: e.shift,
          id: e.id,
        };
      });
    },
    DELETE_VESSEL(state, vessel) {
      state.voyages = state.voyages.filter((e) => {
        return e.vessel.id != vessel.id;
      });
    },
    UNDO_ACTION_FUNCTION(state, action) {
      console.log("action  ", action);
      state.actionHistory.unshift({
        firstname: action.utilisateur.firstname,
        lastname: action.utilisateur.lastname,
        username: action.utilisateur.username,
        action: action.actionType,
        date: formatToSimpleFormatDD_MM_YYYY_H_M_S(new Date(action.created_at)),
        shift: action.shift,
        id: action.id,
      });
    },
    TELE_SETTER(state, payload) {
      state.voyageToEditOrSave.tele = payload.tele;
    },
  },
  actions: {
    setVoyagesAction({ commit }) {
      return new Promise((resolve, reject) => {
        CustomizedAxios.get("/api/voyages")
          .then((response) => {
            commit("SET_VOYAGES", response.data.payload);
            resolve(response);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    setArchivedVoyagesAction({ commit }) {
      return new Promise((resolve, reject) => {
        CustomizedAxios.get("/api/voyages/archivedIndex")
          .then((response) => {
            commit("SET_VOYAGES", response.data.payload);
            resolve(response);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    setAllVoyagesAction({ commit }) {
      return new Promise((resolve, reject) => {
        CustomizedAxios.get("/api/voyages/showAll")
          .then((response) => {
            commit("SET_VOYAGES", response.data.payload);
            resolve(response);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    setAllArchivedVoyagesAction({ commit }) {
      return new Promise((resolve, reject) => {
        CustomizedAxios.get("/api/voyages/showAllArchivedIndexAll")
          .then((response) => {
            commit("SET_VOYAGES", response.data.payload);
            resolve(response);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    addVoyageAction({ commit }, payload) {
      return new Promise((resolve, reject) => {
        CustomizedAxios.post("/api/voyage/create", payload)
          .then((response) => {
            commit("ADD_VOYAGE", response.data.payload);
            resolve(response);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    editVoyageAction({ commit }, payload) {
      return new Promise((resolve, reject) => {
        CustomizedAxios.post("/api/voyages/update", payload)
          .then((response) => {
            commit("EDIT_VOYAGE", response.data.payload);
            resolve(response);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    deleteVoyageAction({ commit }, payload) {
      return new Promise((resolve, reject) => {
        CustomizedAxios.post("/api/voyages/delete", payload)
          .then((response) => {
            commit("DELETE_VOYAGE", payload);
            resolve(response);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    archiveVoyageAction({ commit }, payload) {
      return new Promise((resolve, reject) => {
        CustomizedAxios.post("/api/voyages/archive", payload)
          .then((response) => {
            commit("DELETE_VOYAGE", payload);
            resolve(response);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    unarchiveVoyageAction({ commit }, payload) {
      return new Promise((resolve, reject) => {
        CustomizedAxios.post("/api/voyages/unarchive", payload)
          .then((response) => {
            commit("DELETE_VOYAGE", payload);
            resolve(response);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    setVoyageToEditAction({ commit }, payload) {
      commit("SET_VOYAGE_TO_EDIT_SAVE", payload);
    },
    setActualVoyagesAction({ commit }, payload) {
      return new Promise((resolve, reject) => {
        CustomizedAxios.get("/api/voyages/allVoyages/" + payload)
          .then((response) => {
            commit("SET_ACTUAL_VOYAGE", response.data);
            resolve(response);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    initializeVoyageToEditOrSave({ commit }) {
      commit("INITIALIZE_VOYAGE_TO_EDIT_SAVE");
    },
    damageContainerSetterAction({ commit }, payload) {
      commit("DAMAGE_CONTAINER_SETTER", payload);
    },
    vesselArrivedWithSetterAction({ commit }, payload) {
      commit("VESSEL_ARRIVED_WITH_SETTER", payload);
    },
    commentsSetterAction({ commit }, payload) {
      commit("COMMENTS_SETTER", payload);
    },
    hatchCoversGearBoxesSetterAction({ commit }, payload) {
      commit("HATCH_COVERS_GEAR_BOXES_SETTER", payload);
    },
    firstLineVesselAllFastSetterAction({ commit }, payload) {
      commit("FIRST_LINE_VESSEL_ALL_FAST_SETTER", payload);
    },
    dishGearShipSetterAction({ commit }, payload) {
      commit("DISH_GEAR_SHIP_SETTER", payload);
    },
    dishGearShip2SetterAction({ commit }, payload) {
      commit("DISH_GEAR_SHIP2_SETTER", payload);
    },
    leftDelaySetterAction({ commit }, payload) {
      commit("LEFT_DELAY_SETTER", payload);
    },
    delaySetterAction({ commit }, payload) {
      commit("DELAY_SETTER", payload);
    },
    vesselDepartureSetterAction({ commit }, payload) {
      commit("VESSEL_DEPARTURE_SETTER", payload);
    },
    vesselDepartureSetter2Action({ commit }, payload) {
      commit("VESSEL_DEPARTURE_SETTER2", payload);
    },
    vesselSetterAction({ commit }, payload) {
      commit("VESSEL_SETTER", payload);
    },
    saveOrUpdateVoyageAction({ state, commit }) {
      let voyageToEditOrSaveCastToLaravelDatetimme = {
        comments: state.voyageToEditOrSave.comments,
        shift: state.shift,
        vawgd: state.voyageToEditOrSave.vawgd,
        vawsnrog: state.voyageToEditOrSave.vawsnrog,
        dm_y: state.voyageToEditOrSave.dm_y,
        dm_g: state.voyageToEditOrSave.dm_g,
        hatch_covers_num: state.voyageToEditOrSave.hatch_covers_num,
        hatch_covers_num_40: state.voyageToEditOrSave.hatch_covers_num_40,
        hatch_covers_moves: state.voyageToEditOrSave.hatch_covers_moves,
        gear_boxes_num: state.voyageToEditOrSave.gear_boxes_num,
        gear_boxes_num_40: state.voyageToEditOrSave.gear_boxes_num_40,
        any_hydraulic_couvers: state.voyageToEditOrSave.any_hydraulic_couvers,
        gear_boxes_moves: state.voyageToEditOrSave.gear_boxes_moves,
        pgb_r_co: state.voyageToEditOrSave.pgb_r_co,
        pgb_r_co_reason: state.voyageToEditOrSave.pgb_r_co_reason,
        first_line_datetime: toLaravelDatetime(
          state.voyageToEditOrSave.first_line_datetime
        ),
        vessel_all_fast: toLaravelDatetime(
          state.voyageToEditOrSave.vessel_all_fast
        ),
        gangway_secured: toLaravelDatetime(
          state.voyageToEditOrSave.gangway_secured
        ),
        lashers_onboard: toLaravelDatetime(
          state.voyageToEditOrSave.lashers_onboard
        ),
        num_mooring_r_fore: state.voyageToEditOrSave.num_mooring_r_fore,
        num_mooring_r_aft: state.voyageToEditOrSave.num_mooring_r_aft,
        dwuscfb: state.voyageToEditOrSave.dwuscfb,
        imo_class: state.voyageToEditOrSave.imo_class,
        imo_class_ps_onb: state.voyageToEditOrSave.imo_class_ps_onb,
        last_lift_from: toLaravelDatetime(
          state.voyageToEditOrSave.last_lift_from
        ),
        last_lift_to: toLaravelDatetime(state.voyageToEditOrSave.last_lift_to),
        last_lift_comment: state.voyageToEditOrSave.last_lift_comment,
        lf_from: toLaravelDatetime(state.voyageToEditOrSave.lf_from),
        lf_to: toLaravelDatetime(state.voyageToEditOrSave.lf_to),
        lf_comment: state.voyageToEditOrSave.lf_comment,
        agent_onboard_from: toLaravelDatetime(
          state.voyageToEditOrSave.agent_onboard_from
        ),
        agent_onboard_to: toLaravelDatetime(
          state.voyageToEditOrSave.agent_onboard_to
        ),
        agent_onboard_comment: state.voyageToEditOrSave.agent_onboard_comment,

        safety_net_gangway_from: toLaravelDatetime(
          state.voyageToEditOrSave.safety_net_gangway_from
        ),
        safety_net_gangway_to: toLaravelDatetime(
          state.voyageToEditOrSave.safety_net_gangway_to
        ),
        safety_net_gangway_comment:
          state.voyageToEditOrSave.safety_net_gangway_comment,

        pilot_onboard_from: toLaravelDatetime(
          state.voyageToEditOrSave.pilot_onboard_from
        ),
        pilot_onboard_to: toLaravelDatetime(
          state.voyageToEditOrSave.pilot_onboard_to
        ),
        pilot_onboard_comment: state.voyageToEditOrSave.pilot_onboard_comment,

        tugs_arrived_from: toLaravelDatetime(
          state.voyageToEditOrSave.tugs_arrived_from
        ),
        tugs_arrived_to: toLaravelDatetime(
          state.voyageToEditOrSave.tugs_arrived_to
        ),
        tugs_arrived_comment: state.voyageToEditOrSave.tugs_arrived_comment,

        unmooring_forward_from: toLaravelDatetime(
          state.voyageToEditOrSave.unmooring_forward_from
        ),
        unmooring_forward_to: toLaravelDatetime(
          state.voyageToEditOrSave.unmooring_forward_to
        ),
        unmooring_forward_comment:
          state.voyageToEditOrSave.unmooring_forward_comment,

        unmooring_aft_from: toLaravelDatetime(
          state.voyageToEditOrSave.unmooring_aft_from
        ),
        unmooring_aft_to: toLaravelDatetime(
          state.voyageToEditOrSave.unmooring_aft_to
        ),
        unmooring_aft_comment: state.voyageToEditOrSave.unmooring_aft_comment,

        last_line_from: toLaravelDatetime(
          state.voyageToEditOrSave.last_line_from
        ),
        last_line_to: toLaravelDatetime(state.voyageToEditOrSave.last_line_to),
        last_line_comment: state.voyageToEditOrSave.last_line_comment,
        manoeuvre_sequence: state.voyageToEditOrSave.manoeuvre_sequence,
        tele: state.voyageToEditOrSave.tele,
        vessel_id: state.voyageToEditOrSave.vessel_id,
        id: state.voyageToEditOrSave.id,
        crane_voyages: state.voyageToEditOrSave.crane_voyages,
        other_delays: state.voyageToEditOrSave.other_delays,
        vessel: {
          vessel_name: state.voyageToEditOrSave.vessel.vessel_name,
          service: state.voyageToEditOrSave.vessel.service,
          eta: toLaravelDatetime(state.voyageToEditOrSave.vessel.eta),
          etd: toLaravelDatetime(state.voyageToEditOrSave.vessel.etd),
          voy_no: state.voyageToEditOrSave.vessel.voy_no,

          id: state.voyageToEditOrSave.vessel.id,
        },
      };
      voyageToEditOrSaveCastToLaravelDatetimme.crane_voyages =
        voyageToEditOrSaveCastToLaravelDatetimme.crane_voyages.map((e) => {
          return {
            cbd: toLaravelDatetime(e.cbd),
            dgbohc_bfl_from: toLaravelDatetime(e.dgbohc_bfl_from),
            dgbohc_bfl_to: toLaravelDatetime(e.dgbohc_bfl_to),
            dgbohc_bfl_num_gb: e.dgbohc_bfl_num_gb,
            dgbohc_bfl_num_hc: e.dgbohc_bfl_num_hc,
            dss_bfl_from: toLaravelDatetime(e.dss_bfl_from),
            dss_bfl_to: toLaravelDatetime(e.dss_bfl_to),
            dss_bfl_num_sp: e.dss_bfl_num_sp,
            dss_bfl_fb_dnw: e.dss_bfl_fb_dnw,
            dss_bfl_fb: e.dss_bfl_fb,
            crane_id: e.crane_id,
            ffl: toLaravelDatetime(e.ffl),
            fll: toLaravelDatetime(e.fll),
            sfl: toLaravelDatetime(e.sfl),
            sll: toLaravelDatetime(e.sll),
            tfl: toLaravelDatetime(e.tfl),
            tll: toLaravelDatetime(e.tll),
            fofl: toLaravelDatetime(e.fofl),
            foll: toLaravelDatetime(e.foll),
            fifl: toLaravelDatetime(e.fifl),
            fill: toLaravelDatetime(e.fill),
            sifl: toLaravelDatetime(e.sifl),
            sill: toLaravelDatetime(e.sill),
            sevfl: toLaravelDatetime(e.sevfl),
            sevll: toLaravelDatetime(e.sevll),
            eifl: toLaravelDatetime(e.eifl),
            eill: toLaravelDatetime(e.eill),
            nfl: toLaravelDatetime(e.nfl),
            nll: toLaravelDatetime(e.nll),
            tenfl: toLaravelDatetime(e.tenfl),
            tenll: toLaravelDatetime(e.tenll),
            lgbohc_all_from: toLaravelDatetime(e.lgbohc_all_from),
            lgbohc_all_to: toLaravelDatetime(e.lgbohc_all_to),
            lgbohc_all_num_gb: e.lgbohc_all_num_gb,
            lgbohc_all_hc: e.lgbohc_all_hc,
            lgbohc_all_inbay: e.lgbohc_all_inbay,
            lgbohc_all_inbay_hatch_covers: e.lgbohc_all_inbay_hatch_covers,
            lss_all_from: toLaravelDatetime(e.lss_all_from),
            lss_all_to: toLaravelDatetime(e.lss_all_to),
            lss_all_num_ss: e.lss_all_num_ss,
            lss_all_ib: e.lss_all_ib,
            lss_all_ib_lnw: e.lss_all_ib_lnw,
            cbu: toLaravelDatetime(e.cbu),
            voyage_id: state.voyageToEditOrSave.id,
            id: e.id,
          };
        });
      voyageToEditOrSaveCastToLaravelDatetimme.other_delays =
        voyageToEditOrSaveCastToLaravelDatetimme.other_delays.map((e) => {
          return {
            id: e.id,
            from: toLaravelDatetime(e.from),
            to: toLaravelDatetime(e.to),
            reason: e.reason,
            comment: e.comment,
            dep_arr: e.dep_arr,
            crane_id: e.crane_id,
            code_id: e.code_id,
            code: e.code,
            category: e.category,
            voyage_id: state.voyageToEditOrSave.id,
          };
        });
      return new Promise((resolve, reject) => {
        CustomizedAxios.post(
          "/api/voyages/saveOrUpdateVoyage",
          voyageToEditOrSaveCastToLaravelDatetimme
        )
          .then((response) => {
            if (response.data.status == "200")
              commit("SAVE_OR_UPDATE_VOYAGE", response.data.payload);
            resolve(response.data);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    registerAction() {
      return new Promise((resolve, reject) => {
        CustomizedAxios.post("/api/utilisateurs/register", {
          username: "user",
          password: "123456",
          password_confirmation: "123456",
          password_confirmation: "123456",
          firstname: "fayssal",
          lastname: "ourezzouq",
          role: "admin",
        })
          .then((response) => {
            resolve(response);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    shiftSetterAction({ commit }, payload) {
      commit("SHIFT_SETTER", payload);
    },
    setActionHistoryAction({ commit }, payload) {
      return new Promise((resolve, reject) => {
        CustomizedAxios.get(
          "/api/voyages/getActionHistory/" + payload.vessel_id
        )
          .then((response) => {
            commit("SET_ACTION_HISTORY", response.data.payload);
            resolve(response);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    deleteOtherDelayAction({ commit }, payload) {
      return new Promise((resolve, reject) => {
        CustomizedAxios.post("/api/voyages/deleteOtherDelay", payload)
          .then((response) => {
            if (response.data.status == "200")
              commit("DELETE_OTHER_DELAY", payload);
            resolve(response);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    deleteVesselAction({ commit }, payload) {
      return new Promise((resolve, reject) => {
        CustomizedAxios.post("/api/voyages/delete", payload)
          .then((response) => {
            if (response.data.status == "200") commit("DELETE_VESSEL", payload);
            resolve(response);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    undoAnctionFunctionAction({ commit }, payload) {
      console.log("payload", payload);
      return new Promise((resolve, reject) => {
        CustomizedAxios.post("/api/voyages/undoAnctionFunction", payload)
          .then((response) => {
            if (response.data.status == "200")
              commit("UNDO_ACTION_FUNCTION", response.data.payload);
            resolve(response);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    sendShiftReportAction() {
      axios.defaults.baseURL = "http://10.20.33.112:9003";
      axios.defaults.headers.common["Accept"] = "*/*";
      axios.defaults.connection = "keep-alive";
      return new Promise((resolve, reject) => {
        axios
          .post("/api")
          .then((response) => {
            axios.defaults.baseURL = "http://10.20.33.112:8000";
            console.log("wssl hna", response);
            if (response.data == true) resolve(true);
            else reject(false);
          })
          .catch((error) => {
            axios.defaults.baseURL = "http://10.20.33.112:8000";
            console.log("wssl hna 2", error);
            if (error.data == true) resolve(true);
            else reject(false);
          });
      });
    },
    teleSetterAction({ commit }, payload) {
      commit("TELE_SETTER", payload);
    },
  },
  getters: {
    getVoyages: (state) => {
      return state.voyages;
    },
    getVessels: (state) => {
      return state.voyages.map((e) => e.vessel);
    },
    getVoyageToEditOrSave: (state) => {
      return state.voyageToEditOrSave;
    },
    getActualVoyages: (state) => {
      return state.actualVoyages;
    },
    getActionHistory: (state) => {
      return state.actionHistory;
    },
    getShift: (state) => {
      return state.shift;
    },
  },
};
export default voyageModule;
