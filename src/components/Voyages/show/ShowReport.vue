<template>
  <div class="content">
    <table style="width: 100%; margin-bottom: 20px">
      <tr>
        <td rowspan="4" style="width: 33.33%"><div class="logo"></div></td>
        <td style="width: 33.33%">From</td>
        <td style="width: 33.33%">TA_OPS_Form_002</td>
      </tr>
      <tr>
        <td rowspan="3">VESSEL OPERATING STATUS REPORT</td>
        <td>
          Creation Date: <span class="value">{{ voyage.created_at }}</span>
        </td>
      </tr>
      <tr>
        <td>
          Revision Date: <span class="value">{{ voyage.updated_at }}</span>
        </td>
      </tr>
      <tr>
        <td>Version 2.0</td>
      </tr>
    </table>
    <div class="vesselArrival">VESSEL ARRIVAL</div>
    <div class="sectionVesselArrived" style="width: 100%; margin-bottom: 20px">
      <div class="sectionVesselArrivedTable" style="margin-right: 5%">
        <table>
          <tr>
            <td style="width: 50%">VESSEL NAME</td>
            <td style="width: 50%" class="value">
              {{ voyage.vessel.vessel_name }}
            </td>
          </tr>
          <tr>
            <td style="width: 50%">SERVICE</td>
            <td style="width: 50%" class="value">
              {{ voyage.vessel.service }}
            </td>
          </tr>
          <tr>
            <td style="width: 50%">VOYAGE</td>
            <td style="width: 50%" class="value">{{ voyage.vessel.voy_no }}</td>
          </tr>
        </table>
      </div>
      <div class="sectionVesselArrivedTable">
        <table>
          <tr>
            <td style="width: 80%; border: none">
              Vessel arrived with gangway down ?
            </td>
            <td
              style="width: 30%"
              colspan="4"
              class="value"
              v-if="voyage.vawgd"
            >
              Yes
            </td>
            <td style="width: 30%" colspan="4" class="value" v-else>No</td>
          </tr>
          <tr>
            <td style="width: 70%; border: none">
              Vessel arrived with safety net ready on gangway ?
            </td>
            <td
              style="width: 30%"
              colspan="4"
              class="value"
              v-if="voyage.vawsnrog"
            >
              Yes
            </td>
            <td style="width: 30%" colspan="4" class="value" v-else>No</td>
          </tr>
        </table>
      </div>
    </div>
    <div style="width: 100%" class="damagedCountainedDIV">
      <div class="damagedCountained">
        <table>
          <tr>
            <td rowspan="2" style="border: none; padding-right: 20px">
              Damaged containers?
            </td>
            <td style="width: 25%">Yard</td>
            <td style="width: 20%" colspan="4" class="value" v-if="voyage.dm_y">
              Yes
            </td>
            <td style="width: 20%" colspan="4" class="value" v-else>No</td>
          </tr>
          <tr>
            <td style="width: 25%">Gangway</td>
            <td style="width: 20%" colspan="4" class="value" v-if="voyage.dm_g">
              Yes
            </td>
            <td style="width: 20%" colspan="4" class="value" v-else>No</td>
          </tr>
        </table>
      </div>
    </div>
    <div class="arrivalFirstTable">
      <table style="width: 100%">
        <tr>
          <td colspan="2" style="border: none"></td>
          <td colspan="2" style="border: none"></td>
          <td style="border: none"></td>
          <td style="border: none"></td>
          <td colspan="2">Date/Time</td>
          <td colspan="2">Number of Moorning Ropes</td>
        </tr>
        <tr>
          <td colspan="2"></td>
          <td>Number</td>
          <td>Moves</td>
          <td colspan="2">First Line</td>
          <td colspan="2" class="value">{{ voyage.first_line_datetime }}</td>
          <td>For</td>
          <td class="value">{{ voyage.num_mooring_r_fore }}</td>
        </tr>
        <tr>
          <td colspan="2">Hatch Covers</td>
          <td class="value">{{ voyage.hatch_covers_num }}</td>
          <td class="value">{{ voyage.hatch_covers_moves }}</td>
          <td colspan="2">Vessel All Fast (mooring finished)</td>
          <td colspan="2" class="value">{{ voyage.vessel_all_fast }}</td>
          <td>Aft</td>
          <td class="value">{{ voyage.num_mooring_r_aft }}</td>
        </tr>

        <tr>
          <td colspan="2">Gear Boxes 20ft</td>
          <td class="value">
            {{ voyage.gear_boxes_num }}
          </td>
          <td class="value">{{ voyage.gear_boxes_num * 2 }}</td>
          <td colspan="2">Gangway Secured</td>
          <td colspan="2" class="value">{{ voyage.gangway_secured }}</td>
          <td colspan="2">Did We Use Safety cage for Boarding?</td>
        </tr>

        <tr>
          <td colspan="2">Gear Boxes 40ft</td>
          <td class="value">{{ voyage.gear_boxes_num_40 }}</td>
          <td class="value">{{ voyage.gear_boxes_num_40 * 2 }}</td>

          <td colspan="2">Lashers onboard</td>
          <td colspan="2" class="value">{{ voyage.lashers_onboard }}</td>
          <td
            style="width: 10%"
            colspan="2"
            class="value"
            v-if="voyage.dwuscfb"
          >
            Yes
          </td>
          <td style="width: 10%" colspan="2" class="value" v-else>No</td>
        </tr>
      </table>
    </div>
    <div style="padding-top: 10px">
      <table style="width: 100%">
        <tr>
          <td style="width: 30%; border: none">
            IMO Class 1.4 - 6,2 - 7 Container onboard ?
          </td>

          <td
            style="width: 10%"
            colspan="2"
            class="value"
            v-if="voyage.imo_class"
          >
            Yes
          </td>
          <td style="width: 10%" colspan="2" class="value" v-else>No</td>

          <td style="width: 20%">Positions onboard</td>
          <td style="width: 20%" class="value">
            {{ voyage.imo_class ? voyage.imo_class_ps_onb : "" }}
          </td>
        </tr>
      </table>
    </div>

    <div style="width: 100%">
      <table style="width: 100%">
        <tr>
          <td colspan="2"></td>
          <td>8th GANG</td>
          <td>7th GANG</td>
          <td>6th GANG</td>
          <td>5th GANG</td>
          <td>4th GANG</td>
          <td>3th GANG</td>
          <td>2th GANG</td>
          <td>1th GANG</td>
        </tr>
        <tr>
          <td colspan="2">ِCrane ID.</td>
          <td>STS8</td>
          <td>STS7</td>
          <td>STS6</td>
          <td>STS5</td>
          <td>STS4</td>
          <td>STS3</td>
          <td>STS2</td>
          <td>STS1</td>
        </tr>
        <tr>
          <td colspan="2">Crane Boom Down</td>
          <td class="value">{{ voyageCraneForSTS8.cbd }}</td>
          <td class="value">{{ voyageCraneForSTS7.cbd }}</td>
          <td class="value">{{ voyageCraneForSTS6.cbd }}</td>
          <td class="value">{{ voyageCraneForSTS5.cbd }}</td>
          <td class="value">{{ voyageCraneForSTS4.cbd }}</td>
          <td class="value">{{ voyageCraneForSTS3.cbd }}</td>
          <td class="value">{{ voyageCraneForSTS2.cbd }}</td>
          <td class="value">{{ voyageCraneForSTS1.cbd }}</td>
        </tr>
        <tr>
          <td rowspan="4" style="height: 223px !important">
            <span class="rotate"
              >Disch. of Gear Boxes <br />
              &/or Hatch Covers before 1st Lift</span
            >
          </td>
          <td>From (Date/Time)</td>
          <td class="value">{{ voyageCraneForSTS8.dgbohc_bfl_from }}</td>
          <td class="value">{{ voyageCraneForSTS7.dgbohc_bfl_from }}</td>
          <td class="value">{{ voyageCraneForSTS6.dgbohc_bfl_from }}</td>
          <td class="value">{{ voyageCraneForSTS5.dgbohc_bfl_from }}</td>
          <td class="value">{{ voyageCraneForSTS4.dgbohc_bfl_from }}</td>
          <td class="value">{{ voyageCraneForSTS3.dgbohc_bfl_from }}</td>
          <td class="value">{{ voyageCraneForSTS2.dgbohc_bfl_from }}</td>
          <td class="value">{{ voyageCraneForSTS1.dgbohc_bfl_from }}</td>
        </tr>
        <tr>
          <td>To (Date/Time)</td>
          <td class="value">{{ voyageCraneForSTS8.dgbohc_bfl_to }}</td>
          <td class="value">{{ voyageCraneForSTS7.dgbohc_bfl_to }}</td>
          <td class="value">{{ voyageCraneForSTS6.dgbohc_bfl_to }}</td>
          <td class="value">{{ voyageCraneForSTS5.dgbohc_bfl_to }}</td>
          <td class="value">{{ voyageCraneForSTS4.dgbohc_bfl_to }}</td>
          <td class="value">{{ voyageCraneForSTS3.dgbohc_bfl_to }}</td>
          <td class="value">{{ voyageCraneForSTS2.dgbohc_bfl_to }}</td>
          <td class="value">{{ voyageCraneForSTS1.dgbohc_bfl_to }}</td>
        </tr>
        <tr>
          <td>Number of gear boxes</td>
          <td class="value">{{ voyageCraneForSTS8.dgbohc_bfl_num_gb }}</td>
          <td class="value">{{ voyageCraneForSTS7.dgbohc_bfl_num_gb }}</td>
          <td class="value">{{ voyageCraneForSTS6.dgbohc_bfl_num_gb }}</td>
          <td class="value">{{ voyageCraneForSTS5.dgbohc_bfl_num_gb }}</td>
          <td class="value">{{ voyageCraneForSTS4.dgbohc_bfl_num_gb }}</td>
          <td class="value">{{ voyageCraneForSTS3.dgbohc_bfl_num_gb }}</td>
          <td class="value">{{ voyageCraneForSTS2.dgbohc_bfl_num_gb }}</td>
          <td class="value">{{ voyageCraneForSTS1.dgbohc_bfl_num_gb }}</td>
        </tr>
        <tr>
          <td>Number of Hatch Covers</td>
          <td class="value">{{ voyageCraneForSTS8.dgbohc_bfl_num_hc }}</td>
          <td class="value">{{ voyageCraneForSTS7.dgbohc_bfl_num_hc }}</td>
          <td class="value">{{ voyageCraneForSTS6.dgbohc_bfl_num_hc }}</td>
          <td class="value">{{ voyageCraneForSTS5.dgbohc_bfl_num_hc }}</td>
          <td class="value">{{ voyageCraneForSTS4.dgbohc_bfl_num_hc }}</td>
          <td class="value">{{ voyageCraneForSTS3.dgbohc_bfl_num_hc }}</td>
          <td class="value">{{ voyageCraneForSTS2.dgbohc_bfl_num_hc }}</td>
          <td class="value">{{ voyageCraneForSTS1.dgbohc_bfl_num_hc }}</td>
        </tr>
        <tr>
          <td rowspan="5" style="height: 223px !important">
            <span class="rotate"
              >Disch. Of Ship's <br />
              Spreaders before 1st Lift</span
            >
          </td>
          <td>From (Date/Time)</td>
          <td class="value">{{ voyageCraneForSTS8.dss_bfl_from }}</td>
          <td class="value">{{ voyageCraneForSTS7.dss_bfl_from }}</td>
          <td class="value">{{ voyageCraneForSTS6.dss_bfl_from }}</td>
          <td class="value">{{ voyageCraneForSTS5.dss_bfl_from }}</td>
          <td class="value">{{ voyageCraneForSTS4.dss_bfl_from }}</td>
          <td class="value">{{ voyageCraneForSTS3.dss_bfl_from }}</td>
          <td class="value">{{ voyageCraneForSTS2.dss_bfl_from }}</td>
          <td class="value">{{ voyageCraneForSTS1.dss_bfl_from }}</td>
        </tr>
        <tr>
          <td>To (Date/Time)</td>
          <td class="value">{{ voyageCraneForSTS8.dss_bfl_to }}</td>
          <td class="value">{{ voyageCraneForSTS7.dss_bfl_to }}</td>
          <td class="value">{{ voyageCraneForSTS6.dss_bfl_to }}</td>
          <td class="value">{{ voyageCraneForSTS5.dss_bfl_to }}</td>
          <td class="value">{{ voyageCraneForSTS4.dss_bfl_to }}</td>
          <td class="value">{{ voyageCraneForSTS3.dss_bfl_to }}</td>
          <td class="value">{{ voyageCraneForSTS2.dss_bfl_to }}</td>
          <td class="value">{{ voyageCraneForSTS1.dss_bfl_to }}</td>
        </tr>
        <tr>
          <td>Number of spreaders</td>
          <td class="value">{{ voyageCraneForSTS8.dss_bfl_num_sp }}</td>
          <td class="value">{{ voyageCraneForSTS7.dss_bfl_num_sp }}</td>
          <td class="value">{{ voyageCraneForSTS6.dss_bfl_num_sp }}</td>
          <td class="value">{{ voyageCraneForSTS5.dss_bfl_num_sp }}</td>
          <td class="value">{{ voyageCraneForSTS4.dss_bfl_num_sp }}</td>
          <td class="value">{{ voyageCraneForSTS3.dss_bfl_num_sp }}</td>
          <td class="value">{{ voyageCraneForSTS2.dss_bfl_num_sp }}</td>
          <td class="value">{{ voyageCraneForSTS1.dss_bfl_num_sp }}</td>
        </tr>
        <tr>
          <td>From Bay / Disch by NS or Wires?</td>
          <td class="value">{{ voyageCraneForSTS8.dss_bfl_fb_dnw }}</td>
          <td class="value">{{ voyageCraneForSTS7.dss_bfl_fb_dnw }}</td>
          <td class="value">{{ voyageCraneForSTS6.dss_bfl_fb_dnw }}</td>
          <td class="value">{{ voyageCraneForSTS5.dss_bfl_fb_dnw }}</td>
          <td class="value">{{ voyageCraneForSTS4.dss_bfl_fb_dnw }}</td>
          <td class="value">{{ voyageCraneForSTS3.dss_bfl_fb_dnw }}</td>
          <td class="value">{{ voyageCraneForSTS2.dss_bfl_fb_dnw }}</td>
          <td class="value">{{ voyageCraneForSTS1.dss_bfl_fb_dnw }}</td>
        </tr>
        <tr>
          <td colspan="5">
            If spreaders discharged by the ship itself specify number , position
            & duration of handling spreaders by the ship.
          </td>
          <td colspan="4"></td>
        </tr>
        <tr>
          <td colspan="2">1st First LIFT</td>
          <td class="value">{{ voyageCraneForSTS8.ffl }}</td>
          <td class="value">{{ voyageCraneForSTS7.ffl }}</td>
          <td class="value">{{ voyageCraneForSTS6.ffl }}</td>
          <td class="value">{{ voyageCraneForSTS5.ffl }}</td>
          <td class="value">{{ voyageCraneForSTS4.ffl }}</td>
          <td class="value">{{ voyageCraneForSTS3.ffl }}</td>
          <td class="value">{{ voyageCraneForSTS2.ffl }}</td>
          <td class="value">{{ voyageCraneForSTS1.ffl }}</td>
        </tr>
        <tr
          v-if="
            (voyageCraneForSTS1.fll != '' && voyageCraneForSTS1.fll != null) ||
            (voyageCraneForSTS2.fll != '' && voyageCraneForSTS2.fll != null) ||
            (voyageCraneForSTS3.fll != '' && voyageCraneForSTS3.fll != null) ||
            (voyageCraneForSTS4.fll != '' && voyageCraneForSTS4.fll != null) ||
            (voyageCraneForSTS5.fll != '' && voyageCraneForSTS5.fll != null) ||
            (voyageCraneForSTS6.fll != '' && voyageCraneForSTS6.fll != null) ||
            (voyageCraneForSTS7.fll != '' && voyageCraneForSTS7.fll != null) ||
            (voyageCraneForSTS8.fll != '' && voyageCraneForSTS8.fll != null)
          "
        >
          <td colspan="2">1st Last LIFT</td>
          <td class="value">{{ voyageCraneForSTS8.fll }}</td>
          <td class="value">{{ voyageCraneForSTS7.fll }}</td>
          <td class="value">{{ voyageCraneForSTS6.fll }}</td>
          <td class="value">{{ voyageCraneForSTS5.fll }}</td>
          <td class="value">{{ voyageCraneForSTS4.fll }}</td>
          <td class="value">{{ voyageCraneForSTS3.fll }}</td>
          <td class="value">{{ voyageCraneForSTS2.fll }}</td>
          <td class="value">{{ voyageCraneForSTS1.fll }}</td>
        </tr>
        <tr
          v-if="
            (voyageCraneForSTS1.sfl != '' && voyageCraneForSTS1.sfl != null) ||
            (voyageCraneForSTS2.sfl != '' && voyageCraneForSTS2.sfl != null) ||
            (voyageCraneForSTS3.sfl != '' && voyageCraneForSTS3.sfl != null) ||
            (voyageCraneForSTS4.sfl != '' && voyageCraneForSTS4.sfl != null) ||
            (voyageCraneForSTS5.sfl != '' && voyageCraneForSTS5.sfl != null) ||
            (voyageCraneForSTS6.sfl != '' && voyageCraneForSTS6.sfl != null) ||
            (voyageCraneForSTS7.sfl != '' && voyageCraneForSTS7.sfl != null) ||
            (voyageCraneForSTS8.sfl != '' && voyageCraneForSTS8.sfl != null)
          "
        >
          <td colspan="2">2nd First LIFT</td>
          <td class="value">{{ voyageCraneForSTS8.sfl }}</td>
          <td class="value">{{ voyageCraneForSTS7.sfl }}</td>
          <td class="value">{{ voyageCraneForSTS6.sfl }}</td>
          <td class="value">{{ voyageCraneForSTS5.sfl }}</td>
          <td class="value">{{ voyageCraneForSTS4.sfl }}</td>
          <td class="value">{{ voyageCraneForSTS3.sfl }}</td>
          <td class="value">{{ voyageCraneForSTS2.sfl }}</td>
          <td class="value">{{ voyageCraneForSTS1.sfl }}</td>
        </tr>
        <tr
          v-if="
            (voyageCraneForSTS1.sll != '' && voyageCraneForSTS1.sll != null) ||
            (voyageCraneForSTS2.sll != '' && voyageCraneForSTS2.sll != null) ||
            (voyageCraneForSTS3.sll != '' && voyageCraneForSTS3.sll != null) ||
            (voyageCraneForSTS4.sll != '' && voyageCraneForSTS4.sll != null) ||
            (voyageCraneForSTS5.sll != '' && voyageCraneForSTS5.sll != null) ||
            (voyageCraneForSTS6.sll != '' && voyageCraneForSTS6.sll != null) ||
            (voyageCraneForSTS7.sll != '' && voyageCraneForSTS7.sll != null) ||
            (voyageCraneForSTS8.sll != '' && voyageCraneForSTS8.sll != null)
          "
        >
          <td colspan="2">2nd Last LIFT</td>
          <td class="value">{{ voyageCraneForSTS8.sll }}</td>
          <td class="value">{{ voyageCraneForSTS7.sll }}</td>
          <td class="value">{{ voyageCraneForSTS6.sll }}</td>
          <td class="value">{{ voyageCraneForSTS5.sll }}</td>
          <td class="value">{{ voyageCraneForSTS4.sll }}</td>
          <td class="value">{{ voyageCraneForSTS3.sll }}</td>
          <td class="value">{{ voyageCraneForSTS2.sll }}</td>
          <td class="value">{{ voyageCraneForSTS1.sll }}</td>
        </tr>
        <tr
          v-if="
            (voyageCraneForSTS1.tfl != '' && voyageCraneForSTS1.tfl != null) ||
            (voyageCraneForSTS2.tfl != '' && voyageCraneForSTS2.tfl != null) ||
            (voyageCraneForSTS3.tfl != '' && voyageCraneForSTS3.tfl != null) ||
            (voyageCraneForSTS4.tfl != '' && voyageCraneForSTS4.tfl != null) ||
            (voyageCraneForSTS5.tfl != '' && voyageCraneForSTS5.tfl != null) ||
            (voyageCraneForSTS6.tfl != '' && voyageCraneForSTS6.tfl != null) ||
            (voyageCraneForSTS7.tfl != '' && voyageCraneForSTS7.tfl != null) ||
            (voyageCraneForSTS8.tfl != '' && voyageCraneForSTS8.tfl != null)
          "
        >
          <td colspan="2">3rd First LIFT</td>
          <td class="value">{{ voyageCraneForSTS8.tfl }}</td>
          <td class="value">{{ voyageCraneForSTS7.tfl }}</td>
          <td class="value">{{ voyageCraneForSTS6.tfl }}</td>
          <td class="value">{{ voyageCraneForSTS5.tfl }}</td>
          <td class="value">{{ voyageCraneForSTS4.tfl }}</td>
          <td class="value">{{ voyageCraneForSTS3.tfl }}</td>
          <td class="value">{{ voyageCraneForSTS2.tfl }}</td>
          <td class="value">{{ voyageCraneForSTS1.tfl }}</td>
        </tr>
        <tr
          v-if="
            (voyageCraneForSTS1.tll != '' && voyageCraneForSTS1.tll != null) ||
            (voyageCraneForSTS2.tll != '' && voyageCraneForSTS2.tll != null) ||
            (voyageCraneForSTS3.tll != '' && voyageCraneForSTS3.tll != null) ||
            (voyageCraneForSTS4.tll != '' && voyageCraneForSTS4.tll != null) ||
            (voyageCraneForSTS5.tll != '' && voyageCraneForSTS5.tll != null) ||
            (voyageCraneForSTS6.tll != '' && voyageCraneForSTS6.tll != null) ||
            (voyageCraneForSTS7.tll != '' && voyageCraneForSTS7.tll != null) ||
            (voyageCraneForSTS8.tll != '' && voyageCraneForSTS8.tll != null)
          "
        >
          <td colspan="2">3rd Last LIFT</td>
          <td class="value">{{ voyageCraneForSTS8.tll }}</td>
          <td class="value">{{ voyageCraneForSTS7.tll }}</td>
          <td class="value">{{ voyageCraneForSTS6.tll }}</td>
          <td class="value">{{ voyageCraneForSTS5.tll }}</td>
          <td class="value">{{ voyageCraneForSTS4.tll }}</td>
          <td class="value">{{ voyageCraneForSTS3.tll }}</td>
          <td class="value">{{ voyageCraneForSTS2.tll }}</td>
          <td class="value">{{ voyageCraneForSTS1.tll }}</td>
        </tr>
        <tr
          v-if="
            (voyageCraneForSTS1.fofl != '' &&
              voyageCraneForSTS1.fofl != null) ||
            (voyageCraneForSTS2.fofl != '' &&
              voyageCraneForSTS2.fofl != null) ||
            (voyageCraneForSTS3.fofl != '' &&
              voyageCraneForSTS3.fofl != null) ||
            (voyageCraneForSTS4.fofl != '' &&
              voyageCraneForSTS4.fofl != null) ||
            (voyageCraneForSTS5.fofl != '' &&
              voyageCraneForSTS5.fofl != null) ||
            (voyageCraneForSTS6.fofl != '' &&
              voyageCraneForSTS6.fofl != null) ||
            (voyageCraneForSTS7.fofl != '' &&
              voyageCraneForSTS7.fofl != null) ||
            (voyageCraneForSTS8.fofl != '' && voyageCraneForSTS8.fofl != null)
          "
        >
          <td colspan="2">4th Frist LIFT</td>
          <td class="value">{{ voyageCraneForSTS8.fofl }}</td>
          <td class="value">{{ voyageCraneForSTS7.fofl }}</td>
          <td class="value">{{ voyageCraneForSTS6.fofl }}</td>
          <td class="value">{{ voyageCraneForSTS5.fofl }}</td>
          <td class="value">{{ voyageCraneForSTS4.fofl }}</td>
          <td class="value">{{ voyageCraneForSTS3.fofl }}</td>
          <td class="value">{{ voyageCraneForSTS2.fofl }}</td>
          <td class="value">{{ voyageCraneForSTS1.fofl }}</td>
        </tr>
        <tr
          v-if="
            (voyageCraneForSTS1.foll != '' &&
              voyageCraneForSTS1.foll != null) ||
            (voyageCraneForSTS2.foll != '' &&
              voyageCraneForSTS2.foll != null) ||
            (voyageCraneForSTS3.foll != '' &&
              voyageCraneForSTS3.foll != null) ||
            (voyageCraneForSTS4.foll != '' &&
              voyageCraneForSTS4.foll != null) ||
            (voyageCraneForSTS5.foll != '' &&
              voyageCraneForSTS5.foll != null) ||
            (voyageCraneForSTS6.foll != '' &&
              voyageCraneForSTS6.foll != null) ||
            (voyageCraneForSTS7.foll != '' &&
              voyageCraneForSTS7.foll != null) ||
            (voyageCraneForSTS8.foll != '' && voyageCraneForSTS8.foll != null)
          "
        >
          <td colspan="2">4th Last LIFT</td>
          <td class="value">{{ voyageCraneForSTS8.foll }}</td>
          <td class="value">{{ voyageCraneForSTS7.foll }}</td>
          <td class="value">{{ voyageCraneForSTS6.foll }}</td>
          <td class="value">{{ voyageCraneForSTS5.foll }}</td>
          <td class="value">{{ voyageCraneForSTS4.foll }}</td>
          <td class="value">{{ voyageCraneForSTS3.foll }}</td>
          <td class="value">{{ voyageCraneForSTS2.foll }}</td>
          <td class="value">{{ voyageCraneForSTS1.foll }}</td>
        </tr>
        <tr
          v-if="
            (voyageCraneForSTS1.fifl != '' &&
              voyageCraneForSTS1.fifl != null) ||
            (voyageCraneForSTS2.fifl != '' &&
              voyageCraneForSTS2.fifl != null) ||
            (voyageCraneForSTS3.fifl != '' &&
              voyageCraneForSTS3.fifl != null) ||
            (voyageCraneForSTS4.fifl != '' &&
              voyageCraneForSTS4.fifl != null) ||
            (voyageCraneForSTS5.fifl != '' &&
              voyageCraneForSTS5.fifl != null) ||
            (voyageCraneForSTS6.fifl != '' &&
              voyageCraneForSTS6.fifl != null) ||
            (voyageCraneForSTS7.fifl != '' &&
              voyageCraneForSTS7.fifl != null) ||
            (voyageCraneForSTS8.fifl != '' && voyageCraneForSTS8.fifl != null)
          "
        >
          <td colspan="2">5th Frist LIFT</td>
          <td class="value">{{ voyageCraneForSTS8.fifl }}</td>
          <td class="value">{{ voyageCraneForSTS7.fifl }}</td>
          <td class="value">{{ voyageCraneForSTS6.fifl }}</td>
          <td class="value">{{ voyageCraneForSTS5.fifl }}</td>
          <td class="value">{{ voyageCraneForSTS4.fifl }}</td>
          <td class="value">{{ voyageCraneForSTS3.fifl }}</td>
          <td class="value">{{ voyageCraneForSTS2.fifl }}</td>
          <td class="value">{{ voyageCraneForSTS1.fifl }}</td>
        </tr>
        <tr
          v-if="
            (voyageCraneForSTS1.fill != '' &&
              voyageCraneForSTS1.fill != null) ||
            (voyageCraneForSTS2.fill != '' &&
              voyageCraneForSTS2.fill != null) ||
            (voyageCraneForSTS3.fill != '' &&
              voyageCraneForSTS3.fill != null) ||
            (voyageCraneForSTS4.fill != '' &&
              voyageCraneForSTS4.fill != null) ||
            (voyageCraneForSTS5.fill != '' &&
              voyageCraneForSTS5.fill != null) ||
            (voyageCraneForSTS6.fill != '' &&
              voyageCraneForSTS6.fill != null) ||
            (voyageCraneForSTS7.fill != '' &&
              voyageCraneForSTS7.fill != null) ||
            (voyageCraneForSTS8.fill != '' && voyageCraneForSTS8.fill != null)
          "
        >
          <td colspan="2">5th Last LIFT</td>
          <td class="value">{{ voyageCraneForSTS8.fill }}</td>
          <td class="value">{{ voyageCraneForSTS7.fill }}</td>
          <td class="value">{{ voyageCraneForSTS6.fill }}</td>
          <td class="value">{{ voyageCraneForSTS5.fill }}</td>
          <td class="value">{{ voyageCraneForSTS4.fill }}</td>
          <td class="value">{{ voyageCraneForSTS3.fill }}</td>
          <td class="value">{{ voyageCraneForSTS2.fill }}</td>
          <td class="value">{{ voyageCraneForSTS1.fill }}</td>
        </tr>
        <tr
          v-if="
            (voyageCraneForSTS1.sifl != '' &&
              voyageCraneForSTS1.sifl != null) ||
            (voyageCraneForSTS2.sifl != '' &&
              voyageCraneForSTS2.sifl != null) ||
            (voyageCraneForSTS3.sifl != '' &&
              voyageCraneForSTS3.sifl != null) ||
            (voyageCraneForSTS4.sifl != '' &&
              voyageCraneForSTS4.sifl != null) ||
            (voyageCraneForSTS5.sifl != '' &&
              voyageCraneForSTS5.sifl != null) ||
            (voyageCraneForSTS6.sifl != '' &&
              voyageCraneForSTS6.sifl != null) ||
            (voyageCraneForSTS7.sifl != '' &&
              voyageCraneForSTS7.sifl != null) ||
            (voyageCraneForSTS8.sifl != '' && voyageCraneForSTS8.sifl != null)
          "
        >
          <td colspan="2">6th Frist LIFT</td>
          <td class="value">{{ voyageCraneForSTS8.sifl }}</td>
          <td class="value">{{ voyageCraneForSTS7.sifl }}</td>
          <td class="value">{{ voyageCraneForSTS6.sifl }}</td>
          <td class="value">{{ voyageCraneForSTS5.sifl }}</td>
          <td class="value">{{ voyageCraneForSTS4.sifl }}</td>
          <td class="value">{{ voyageCraneForSTS3.sifl }}</td>
          <td class="value">{{ voyageCraneForSTS2.sifl }}</td>
          <td class="value">{{ voyageCraneForSTS1.sifl }}</td>
        </tr>
        <tr
          v-if="
            (voyageCraneForSTS1.sill != '' &&
              voyageCraneForSTS1.sill != null) ||
            (voyageCraneForSTS2.sill != '' &&
              voyageCraneForSTS2.sill != null) ||
            (voyageCraneForSTS3.sill != '' &&
              voyageCraneForSTS3.sill != null) ||
            (voyageCraneForSTS4.sill != '' &&
              voyageCraneForSTS4.sill != null) ||
            (voyageCraneForSTS5.sill != '' &&
              voyageCraneForSTS5.sill != null) ||
            (voyageCraneForSTS6.sill != '' &&
              voyageCraneForSTS6.sill != null) ||
            (voyageCraneForSTS7.sill != '' &&
              voyageCraneForSTS7.sill != null) ||
            (voyageCraneForSTS8.sill != '' && voyageCraneForSTS8.sill != null)
          "
        >
          <td colspan="2">6th Last LIFT</td>
          <td class="value">{{ voyageCraneForSTS8.sill }}</td>
          <td class="value">{{ voyageCraneForSTS7.sill }}</td>
          <td class="value">{{ voyageCraneForSTS6.sill }}</td>
          <td class="value">{{ voyageCraneForSTS5.sill }}</td>
          <td class="value">{{ voyageCraneForSTS4.sill }}</td>
          <td class="value">{{ voyageCraneForSTS3.sill }}</td>
          <td class="value">{{ voyageCraneForSTS2.sill }}</td>
          <td class="value">{{ voyageCraneForSTS1.sill }}</td>
        </tr>
        <tr
          v-if="
            (voyageCraneForSTS1.sefl != '' &&
              voyageCraneForSTS1.sefl != null) ||
            (voyageCraneForSTS2.sefl != '' &&
              voyageCraneForSTS2.sefl != null) ||
            (voyageCraneForSTS3.sefl != '' &&
              voyageCraneForSTS3.sefl != null) ||
            (voyageCraneForSTS4.sefl != '' &&
              voyageCraneForSTS4.sefl != null) ||
            (voyageCraneForSTS5.sefl != '' &&
              voyageCraneForSTS5.sefl != null) ||
            (voyageCraneForSTS6.sefl != '' &&
              voyageCraneForSTS6.sefl != null) ||
            (voyageCraneForSTS7.sefl != '' &&
              voyageCraneForSTS7.sefl != null) ||
            (voyageCraneForSTS8.sefl != '' && voyageCraneForSTS8.sefl != null)
          "
        >
          <td colspan="2">7th Frist LIFT</td>
          <td class="value">{{ voyageCraneForSTS8.sefl }}</td>
          <td class="value">{{ voyageCraneForSTS7.sefl }}</td>
          <td class="value">{{ voyageCraneForSTS6.sefl }}</td>
          <td class="value">{{ voyageCraneForSTS5.sefl }}</td>
          <td class="value">{{ voyageCraneForSTS4.sefl }}</td>
          <td class="value">{{ voyageCraneForSTS3.sefl }}</td>
          <td class="value">{{ voyageCraneForSTS2.sefl }}</td>
          <td class="value">{{ voyageCraneForSTS1.sefl }}</td>
        </tr>
        <tr
          v-if="
            (voyageCraneForSTS1.sell != '' &&
              voyageCraneForSTS1.sell != null) ||
            (voyageCraneForSTS2.sell != '' &&
              voyageCraneForSTS2.sell != null) ||
            (voyageCraneForSTS3.sell != '' &&
              voyageCraneForSTS3.sell != null) ||
            (voyageCraneForSTS4.sell != '' &&
              voyageCraneForSTS4.sell != null) ||
            (voyageCraneForSTS5.sell != '' &&
              voyageCraneForSTS5.sell != null) ||
            (voyageCraneForSTS6.sell != '' &&
              voyageCraneForSTS6.sell != null) ||
            (voyageCraneForSTS7.sell != '' &&
              voyageCraneForSTS7.sell != null) ||
            (voyageCraneForSTS8.sell != '' && voyageCraneForSTS8.sell != null)
          "
        >
          <td colspan="2">7th Last LIFT</td>
          <td class="value">{{ voyageCraneForSTS8.sell }}</td>
          <td class="value">{{ voyageCraneForSTS7.sell }}</td>
          <td class="value">{{ voyageCraneForSTS6.sell }}</td>
          <td class="value">{{ voyageCraneForSTS5.sell }}</td>
          <td class="value">{{ voyageCraneForSTS4.sell }}</td>
          <td class="value">{{ voyageCraneForSTS3.sell }}</td>
          <td class="value">{{ voyageCraneForSTS2.sell }}</td>
          <td class="value">{{ voyageCraneForSTS1.sell }}</td>
        </tr>
        <tr
          v-if="
            (voyageCraneForSTS1.eifl != '' &&
              voyageCraneForSTS1.eifl != null) ||
            (voyageCraneForSTS2.eifl != '' &&
              voyageCraneForSTS2.eifl != null) ||
            (voyageCraneForSTS3.eifl != '' &&
              voyageCraneForSTS3.eifl != null) ||
            (voyageCraneForSTS4.eifl != '' &&
              voyageCraneForSTS4.eifl != null) ||
            (voyageCraneForSTS5.eifl != '' &&
              voyageCraneForSTS5.eifl != null) ||
            (voyageCraneForSTS6.eifl != '' &&
              voyageCraneForSTS6.eifl != null) ||
            (voyageCraneForSTS7.eifl != '' &&
              voyageCraneForSTS7.eifl != null) ||
            (voyageCraneForSTS8.eifl != '' && voyageCraneForSTS8.eifl != null)
          "
        >
          <td colspan="2">8th Frist LIFT</td>
          <td class="value">{{ voyageCraneForSTS8.eifl }}</td>
          <td class="value">{{ voyageCraneForSTS7.eifl }}</td>
          <td class="value">{{ voyageCraneForSTS6.eifl }}</td>
          <td class="value">{{ voyageCraneForSTS5.eifl }}</td>
          <td class="value">{{ voyageCraneForSTS4.eifl }}</td>
          <td class="value">{{ voyageCraneForSTS3.eifl }}</td>
          <td class="value">{{ voyageCraneForSTS2.eifl }}</td>
          <td class="value">{{ voyageCraneForSTS1.eifl }}</td>
        </tr>
        <tr
          v-if="
            (voyageCraneForSTS1.eill != '' &&
              voyageCraneForSTS1.eill != null) ||
            (voyageCraneForSTS2.eill != '' &&
              voyageCraneForSTS2.eill != null) ||
            (voyageCraneForSTS3.eill != '' &&
              voyageCraneForSTS3.eill != null) ||
            (voyageCraneForSTS4.eill != '' &&
              voyageCraneForSTS4.eill != null) ||
            (voyageCraneForSTS5.eill != '' &&
              voyageCraneForSTS5.eill != null) ||
            (voyageCraneForSTS6.eill != '' &&
              voyageCraneForSTS6.eill != null) ||
            (voyageCraneForSTS7.eill != '' &&
              voyageCraneForSTS7.eill != null) ||
            (voyageCraneForSTS8.eill != '' && voyageCraneForSTS8.eill != null)
          "
        >
          <td colspan="2">8th Last LIFT</td>
          <td class="value">{{ voyageCraneForSTS8.eill }}</td>
          <td class="value">{{ voyageCraneForSTS7.eill }}</td>
          <td class="value">{{ voyageCraneForSTS6.eill }}</td>
          <td class="value">{{ voyageCraneForSTS5.eill }}</td>
          <td class="value">{{ voyageCraneForSTS4.eill }}</td>
          <td class="value">{{ voyageCraneForSTS3.eill }}</td>
          <td class="value">{{ voyageCraneForSTS2.eill }}</td>
          <td class="value">{{ voyageCraneForSTS1.eill }}</td>
        </tr>
        <tr
          v-if="
            (voyageCraneForSTS1.nfl != '' && voyageCraneForSTS1.nfl != null) ||
            (voyageCraneForSTS2.nfl != '' && voyageCraneForSTS2.nfl != null) ||
            (voyageCraneForSTS3.nfl != '' && voyageCraneForSTS3.nfl != null) ||
            (voyageCraneForSTS4.nfl != '' && voyageCraneForSTS4.nfl != null) ||
            (voyageCraneForSTS5.nfl != '' && voyageCraneForSTS5.nfl != null) ||
            (voyageCraneForSTS6.nfl != '' && voyageCraneForSTS6.nfl != null) ||
            (voyageCraneForSTS7.nfl != '' && voyageCraneForSTS7.nfl != null) ||
            (voyageCraneForSTS8.nfl != '' && voyageCraneForSTS8.nfl != null)
          "
        >
          <td colspan="2">9th Frist LIFT</td>
          <td class="value">{{ voyageCraneForSTS8.nfl }}</td>
          <td class="value">{{ voyageCraneForSTS7.nfl }}</td>
          <td class="value">{{ voyageCraneForSTS6.nfl }}</td>
          <td class="value">{{ voyageCraneForSTS5.nfl }}</td>
          <td class="value">{{ voyageCraneForSTS4.nfl }}</td>
          <td class="value">{{ voyageCraneForSTS3.nfl }}</td>
          <td class="value">{{ voyageCraneForSTS2.nfl }}</td>
          <td class="value">{{ voyageCraneForSTS1.nfl }}</td>
        </tr>
        <tr
          v-if="
            (voyageCraneForSTS1.nll != '' && voyageCraneForSTS1.nll != null) ||
            (voyageCraneForSTS2.nll != '' && voyageCraneForSTS2.nll != null) ||
            (voyageCraneForSTS3.nll != '' && voyageCraneForSTS3.nll != null) ||
            (voyageCraneForSTS4.nll != '' && voyageCraneForSTS4.nll != null) ||
            (voyageCraneForSTS5.nll != '' && voyageCraneForSTS5.nll != null) ||
            (voyageCraneForSTS6.nll != '' && voyageCraneForSTS6.nll != null) ||
            (voyageCraneForSTS7.nll != '' && voyageCraneForSTS7.nll != null) ||
            (voyageCraneForSTS8.nll != '' && voyageCraneForSTS8.nll != null)
          "
        >
          <td colspan="2">9th Last LIFT</td>
          <td class="value">{{ voyageCraneForSTS8.nll }}</td>
          <td class="value">{{ voyageCraneForSTS7.nll }}</td>
          <td class="value">{{ voyageCraneForSTS6.nll }}</td>
          <td class="value">{{ voyageCraneForSTS5.nll }}</td>
          <td class="value">{{ voyageCraneForSTS4.nll }}</td>
          <td class="value">{{ voyageCraneForSTS3.nll }}</td>
          <td class="value">{{ voyageCraneForSTS2.nll }}</td>
          <td class="value">{{ voyageCraneForSTS1.nll }}</td>
        </tr>
        <tr
          v-if="
            (voyageCraneForSTS1.tenfl != '' &&
              voyageCraneForSTS1.tenfl != null) ||
            (voyageCraneForSTS2.tenfl != '' &&
              voyageCraneForSTS2.tenfl != null) ||
            (voyageCraneForSTS3.tenfl != '' &&
              voyageCraneForSTS3.tenfl != null) ||
            (voyageCraneForSTS4.tenfl != '' &&
              voyageCraneForSTS4.tenfl != null) ||
            (voyageCraneForSTS5.tenfl != '' &&
              voyageCraneForSTS5.tenfl != null) ||
            (voyageCraneForSTS6.tenfl != '' &&
              voyageCraneForSTS6.tenfl != null) ||
            (voyageCraneForSTS7.tenfl != '' &&
              voyageCraneForSTS7.tenfl != null) ||
            (voyageCraneForSTS8.tenfl != '' && voyageCraneForSTS8.tenfl != null)
          "
        >
          <td colspan="2">10th Frist LIFT</td>
          <td class="value">{{ voyageCraneForSTS8.tenfl }}</td>
          <td class="value">{{ voyageCraneForSTS7.tenfl }}</td>
          <td class="value">{{ voyageCraneForSTS6.tenfl }}</td>
          <td class="value">{{ voyageCraneForSTS5.tenfl }}</td>
          <td class="value">{{ voyageCraneForSTS4.tenfl }}</td>
          <td class="value">{{ voyageCraneForSTS3.tenfl }}</td>
          <td class="value">{{ voyageCraneForSTS2.tenfl }}</td>
          <td class="value">{{ voyageCraneForSTS1.tenfl }}</td>
        </tr>
        <tr
          v-if="
            (voyageCraneForSTS1.tenll != '' &&
              voyageCraneForSTS1.tenll != null) ||
            (voyageCraneForSTS2.tenll != '' &&
              voyageCraneForSTS2.tenll != null) ||
            (voyageCraneForSTS3.tenll != '' &&
              voyageCraneForSTS3.tenll != null) ||
            (voyageCraneForSTS4.tenll != '' &&
              voyageCraneForSTS4.tenll != null) ||
            (voyageCraneForSTS5.tenll != '' &&
              voyageCraneForSTS5.tenll != null) ||
            (voyageCraneForSTS6.tenll != '' &&
              voyageCraneForSTS6.tenll != null) ||
            (voyageCraneForSTS7.tenll != '' &&
              voyageCraneForSTS7.tenll != null) ||
            (voyageCraneForSTS8.tenll != '' && voyageCraneForSTS8.tenll != null)
          "
        >
          <td colspan="2">10th Last LIFT</td>
          <td class="value">{{ voyageCraneForSTS8.tenll }}</td>
          <td class="value">{{ voyageCraneForSTS7.tenll }}</td>
          <td class="value">{{ voyageCraneForSTS6.tenll }}</td>
          <td class="value">{{ voyageCraneForSTS5.tenll }}</td>
          <td class="value">{{ voyageCraneForSTS4.tenll }}</td>
          <td class="value">{{ voyageCraneForSTS3.tenll }}</td>
          <td class="value">{{ voyageCraneForSTS2.tenll }}</td>
          <td class="value">{{ voyageCraneForSTS1.tenll }}</td>
        </tr>
        <tr>
          <td rowspan="7" style="height: 223px !important">
            <span class="rotate"
              >Load of Gear Boxes <br />
              &/or Hatch Covers after Last Lift</span
            >
          </td>
          <td>From (Date/Time)</td>
          <td class="value">{{ voyageCraneForSTS8.lgbohc_all_from }}</td>
          <td class="value">{{ voyageCraneForSTS7.lgbohc_all_from }}</td>
          <td class="value">{{ voyageCraneForSTS6.lgbohc_all_from }}</td>
          <td class="value">{{ voyageCraneForSTS5.lgbohc_all_from }}</td>
          <td class="value">{{ voyageCraneForSTS4.lgbohc_all_from }}</td>
          <td class="value">{{ voyageCraneForSTS3.lgbohc_all_from }}</td>
          <td class="value">{{ voyageCraneForSTS2.lgbohc_all_from }}</td>
          <td class="value">{{ voyageCraneForSTS1.lgbohc_all_from }}</td>
        </tr>
        <tr>
          <td>To (Date/Time)</td>
          <td class="value">{{ voyageCraneForSTS8.lgbohc_all_to }}</td>
          <td class="value">{{ voyageCraneForSTS7.lgbohc_all_to }}</td>
          <td class="value">{{ voyageCraneForSTS6.lgbohc_all_to }}</td>
          <td class="value">{{ voyageCraneForSTS5.lgbohc_all_to }}</td>
          <td class="value">{{ voyageCraneForSTS4.lgbohc_all_to }}</td>
          <td class="value">{{ voyageCraneForSTS3.lgbohc_all_to }}</td>
          <td class="value">{{ voyageCraneForSTS2.lgbohc_all_to }}</td>
          <td class="value">{{ voyageCraneForSTS1.lgbohc_all_to }}</td>
        </tr>
        <tr>
          <td>Number of gear boxes</td>
          <td class="value">{{ voyageCraneForSTS8.lgbohc_all_num_gb }}</td>
          <td class="value">{{ voyageCraneForSTS7.lgbohc_all_num_gb }}</td>
          <td class="value">{{ voyageCraneForSTS6.lgbohc_all_num_gb }}</td>
          <td class="value">{{ voyageCraneForSTS5.lgbohc_all_num_gb }}</td>
          <td class="value">{{ voyageCraneForSTS4.lgbohc_all_num_gb }}</td>
          <td class="value">{{ voyageCraneForSTS3.lgbohc_all_num_gb }}</td>
          <td class="value">{{ voyageCraneForSTS2.lgbohc_all_num_gb }}</td>
          <td class="value">{{ voyageCraneForSTS1.lgbohc_all_num_gb }}</td>
        </tr>
        <tr>
          <td>GB In Bay</td>
          <td class="value">{{ voyageCraneForSTS8.lgbohc_all_inbay }}</td>
          <td class="value">{{ voyageCraneForSTS7.lgbohc_all_inbay }}</td>
          <td class="value">{{ voyageCraneForSTS6.lgbohc_all_inbay }}</td>
          <td class="value">{{ voyageCraneForSTS5.lgbohc_all_inbay }}</td>
          <td class="value">{{ voyageCraneForSTS4.lgbohc_all_inbay }}</td>
          <td class="value">{{ voyageCraneForSTS3.lgbohc_all_inbay }}</td>
          <td class="value">{{ voyageCraneForSTS2.lgbohc_all_inbay }}</td>
          <td class="value">{{ voyageCraneForSTS1.lgbohc_all_inbay }}</td>
        </tr>
        <tr>
          <td>Number of Hatch Covers</td>
          <td class="value">{{ voyageCraneForSTS8.lgbohc_all_hc }}</td>
          <td class="value">{{ voyageCraneForSTS7.lgbohc_all_hc }}</td>
          <td class="value">{{ voyageCraneForSTS6.lgbohc_all_hc }}</td>
          <td class="value">{{ voyageCraneForSTS5.lgbohc_all_hc }}</td>
          <td class="value">{{ voyageCraneForSTS4.lgbohc_all_hc }}</td>
          <td class="value">{{ voyageCraneForSTS3.lgbohc_all_hc }}</td>
          <td class="value">{{ voyageCraneForSTS2.lgbohc_all_hc }}</td>
          <td class="value">{{ voyageCraneForSTS1.lgbohc_all_hc }}</td>
        </tr>
        <tr>
          <td>HC In Bay</td>
          <td class="value">
            {{ voyageCraneForSTS8.lgbohc_all_inbay_hatch_covers }}
          </td>
          <td class="value">
            {{ voyageCraneForSTS7.lgbohc_all_inbay_hatch_covers }}
          </td>
          <td class="value">
            {{ voyageCraneForSTS6.lgbohc_all_inbay_hatch_covers }}
          </td>
          <td class="value">
            {{ voyageCraneForSTS5.lgbohc_all_inbay_hatch_covers }}
          </td>
          <td class="value">
            {{ voyageCraneForSTS4.lgbohc_all_inbay_hatch_covers }}
          </td>
          <td class="value">
            {{ voyageCraneForSTS3.lgbohc_all_inbay_hatch_covers }}
          </td>
          <td class="value">
            {{ voyageCraneForSTS2.lgbohc_all_inbay_hatch_covers }}
          </td>
          <td class="value">
            {{ voyageCraneForSTS1.lgbohc_all_inbay_hatch_covers }}
          </td>
        </tr>
        <tr>
          <td colspan="2">
            Positions for gear boxes required by C/O ? (If yes specify reason
            given by C/O)
          </td>
          <td colspan="2" v-if="voyage.pgb_r_co != 0" class="value">Yes</td>
          <td colspan="2" v-else class="value">No</td>
          <td colspan="2">Reason if yes</td>
          <td colspan="3" class="value">
            {{ voyage.pgb_r_co_reason ? voyage.pgb_r_co_reason : "" }}
          </td>
        </tr>
      </table>
    </div>
    <div style="width: 100%">
      <table style="width: 100%">
        <tr>
          <td colspan="2">Crane ID.</td>
          <td>STS8</td>
          <td>STS7</td>
          <td>STS6</td>
          <td>STS5</td>
          <td>STS4</td>
          <td>STS3</td>
          <td>STS2</td>
          <td>STS1</td>
        </tr>
        <tr>
          <td rowspan="5" style="height: 223px !important">
            <span class="rotate"
              >Load Of Ship's <br />
              Spreaders after Last Lift</span
            >
          </td>
          <td>From (Date/Time)</td>
          <td class="value">{{ voyageCraneForSTS8.lss_all_from }}</td>
          <td class="value">{{ voyageCraneForSTS7.lss_all_from }}</td>
          <td class="value">{{ voyageCraneForSTS6.lss_all_from }}</td>
          <td class="value">{{ voyageCraneForSTS5.lss_all_from }}</td>
          <td class="value">{{ voyageCraneForSTS4.lss_all_from }}</td>
          <td class="value">{{ voyageCraneForSTS3.lss_all_from }}</td>
          <td class="value">{{ voyageCraneForSTS2.lss_all_from }}</td>
          <td class="value">{{ voyageCraneForSTS1.lss_all_from }}</td>
        </tr>
        <tr>
          <td>To (Date/Time)</td>
          <td class="value">{{ voyageCraneForSTS8.lss_all_to }}</td>
          <td class="value">{{ voyageCraneForSTS7.lss_all_to }}</td>
          <td class="value">{{ voyageCraneForSTS6.lss_all_to }}</td>
          <td class="value">{{ voyageCraneForSTS5.lss_all_to }}</td>
          <td class="value">{{ voyageCraneForSTS4.lss_all_to }}</td>
          <td class="value">{{ voyageCraneForSTS3.lss_all_to }}</td>
          <td class="value">{{ voyageCraneForSTS2.lss_all_to }}</td>
          <td class="value">{{ voyageCraneForSTS1.lss_all_to }}</td>
        </tr>
        <tr>
          <td>Number of ship's spreaders</td>
          <td class="value">{{ voyageCraneForSTS8.lss_all_num_ss }}</td>
          <td class="value">{{ voyageCraneForSTS7.lss_all_num_ss }}</td>
          <td class="value">{{ voyageCraneForSTS6.lss_all_num_ss }}</td>
          <td class="value">{{ voyageCraneForSTS5.lss_all_num_ss }}</td>
          <td class="value">{{ voyageCraneForSTS4.lss_all_num_ss }}</td>
          <td class="value">{{ voyageCraneForSTS3.lss_all_num_ss }}</td>
          <td class="value">{{ voyageCraneForSTS2.lss_all_num_ss }}</td>
          <td class="value">{{ voyageCraneForSTS1.lss_all_num_ss }}</td>
        </tr>
        <tr>
          <td>In Bay / Loaded by NS or Wires?</td>
          <td class="value">{{ voyageCraneForSTS8.lss_all_ib_lnw }}</td>
          <td class="value">{{ voyageCraneForSTS7.lss_all_ib_lnw }}</td>
          <td class="value">{{ voyageCraneForSTS6.lss_all_ib_lnw }}</td>
          <td class="value">{{ voyageCraneForSTS5.lss_all_ib_lnw }}</td>
          <td class="value">{{ voyageCraneForSTS4.lss_all_ib_lnw }}</td>
          <td class="value">{{ voyageCraneForSTS3.lss_all_ib_lnw }}</td>
          <td class="value">{{ voyageCraneForSTS2.lss_all_ib_lnw }}</td>
          <td class="value">{{ voyageCraneForSTS1.lss_all_ib_lnw }}</td>
        </tr>
        <tr>
          <td colspan="9">
            If spreaders loaded by the ship <br />
            itself specify number , <br />
            position & duration of handling <br />
            of these spreaders by the ship
          </td>
        </tr>
        <tr>
          <td colspan="2">Crane Boom Up (after ops completion)</td>
          <td class="value">{{ voyageCraneForSTS8.cbu }}</td>
          <td class="value">{{ voyageCraneForSTS7.cbu }}</td>
          <td class="value">{{ voyageCraneForSTS6.cbu }}</td>
          <td class="value">{{ voyageCraneForSTS5.cbu }}</td>
          <td class="value">{{ voyageCraneForSTS4.cbu }}</td>
          <td class="value">{{ voyageCraneForSTS3.cbu }}</td>
          <td class="value">{{ voyageCraneForSTS2.cbu }}</td>
          <td class="value">{{ voyageCraneForSTS1.cbu }}</td>
        </tr>
      </table>
    </div>
    <br />
    <br />
    <br />
    <br />
    <div style="margin-top: 15px; margin-bottom: 15px">
      Other delays before 1st LIFT (From 1st Line to 1st LIFT)
    </div>
    <div style="width: 100%">
      <table style="width: 100%">
        <tr>
          <td style="width: 10%">Crane ID.</td>
          <td style="width: 10%">From</td>
          <td style="width: 10%">To</td>
          <td style="width: 35%">Reason/Comments</td>
          <td style="width: 35%">Please note the following</td>
        </tr>
        <tr>
          <td style="width: 10%" class="value">
            {{ getCrane(arrivalOtherDelays(0).crane_id).craneId }}
          </td>
          <td style="width: 10%" class="value">
            {{ arrivalOtherDelays(0).from }}
          </td>
          <td style="width: 10%" class="value">
            {{ arrivalOtherDelays(0).to }}
          </td>
          <td style="width: 35%" class="value">
            {{ arrivalOtherDelays(0).code }}
            <span
              v-if="
                arrivalOtherDelays(0).comment != '' &&
                arrivalOtherDelays(0).comment != null
              "
            >
              <br />
              <span
                style="
                  color: black !important;
                  margin-right: 10px;
                  font-size: 16px;
                "
                >Comment :</span
              >
              <span v-html="arrivalOtherDelays(0).comment"> </span>
            </span>
            <span v-else>
              <br />
              <span
                style="
                  color: black !important;
                  margin-right: 10px;
                  font-size: 16px;
                "
                >Reason :</span
              >
              <span>{{ arrivalOtherDelays(0).reason }} </span>
            </span>
          </td>
          <td
            style="width: 35%"
            :rowspan="Other_delaysArrLength > 7 ? Other_delaysArrLength : 7"
          >
            NB: Delays to be recorded should exclude the normal operations
            stipulated above (Hatch Cover, Gearbox…) For example: Crane
            Breakdown / Waiting for ship's crane to swing to seaside / Accident
            / etc….
          </td>
        </tr>
        <tr>
          <td style="width: 10%" class="value">
            {{ getCrane(arrivalOtherDelays(1).crane_id).craneId }}
          </td>
          <td style="width: 10%" class="value">
            {{ arrivalOtherDelays(1).from }}
          </td>
          <td style="width: 10%" class="value">
            {{ arrivalOtherDelays(1).to }}
          </td>
          <td style="width: 35%" class="value">
            {{ arrivalOtherDelays(1).code }}
            <span
              v-if="
                arrivalOtherDelays(1).comment != '' &&
                arrivalOtherDelays(1).comment != null
              "
            >
              <br />
              <span
                style="
                  color: black !important;
                  margin-right: 10px;
                  font-size: 16px;
                "
                >Comment :</span
              >
              <span v-html="arrivalOtherDelays(1).comment"> </span>
            </span>
            <span v-else>
              <br />
              <span
                style="
                  color: black !important;
                  margin-right: 10px;
                  font-size: 16px;
                "
                >Reason :</span
              >
              <span>{{ arrivalOtherDelays(1).reason }} </span>
            </span>
          </td>
        </tr>
        <tr>
          <td style="width: 10%" class="value">
            {{ getCrane(arrivalOtherDelays(2).crane_id).craneId }}
          </td>
          <td style="width: 10%" class="value">
            {{ arrivalOtherDelays(2).from }}
          </td>
          <td style="width: 10%" class="value">
            {{ arrivalOtherDelays(2).to }}
          </td>
          <td style="width: 35%" class="value">
            {{ arrivalOtherDelays(2).code }}
            <span
              v-if="
                arrivalOtherDelays(2).comment != '' &&
                arrivalOtherDelays(2).comment != null
              "
            >
              <br />
              <span
                style="
                  color: black !important;
                  margin-right: 10px;
                  font-size: 16px;
                "
                >Comment :</span
              >
              <span v-html="arrivalOtherDelays(2).comment"> </span>
            </span>
            <span v-else>
              <br />
              <span
                style="
                  color: black !important;
                  margin-right: 10px;
                  font-size: 16px;
                "
                >Reason :</span
              >
              <span>{{ arrivalOtherDelays(2).reason }} </span>
            </span>
          </td>
        </tr>
        <tr>
          <td style="width: 10%" class="value">
            {{ getCrane(arrivalOtherDelays(3).crane_id).craneId }}
          </td>
          <td style="width: 10%" class="value">
            {{ arrivalOtherDelays(3).from }}
          </td>
          <td style="width: 10%" class="value">
            {{ arrivalOtherDelays(3).to }}
          </td>
          <td style="width: 35%" class="value">
            {{ arrivalOtherDelays(3).code }}
            <span
              v-if="
                arrivalOtherDelays(3).comment != '' &&
                arrivalOtherDelays(3).comment != null
              "
            >
              <br />
              <span
                style="
                  color: black !important;
                  margin-right: 10px;
                  font-size: 16px;
                "
                >Comment :</span
              >
              <span v-html="arrivalOtherDelays(3).comment"> </span>
            </span>
            <span v-else>
              <br />
              <span
                style="
                  color: black !important;
                  margin-right: 10px;
                  font-size: 16px;
                "
                >Reason :</span
              >
              <span>{{ arrivalOtherDelays(3).reason }} </span>
            </span>
          </td>
        </tr>
        <tr>
          <td style="width: 10%" class="value">
            {{ getCrane(arrivalOtherDelays(4).crane_id).craneId }}
          </td>
          <td style="width: 10%" class="value">
            {{ arrivalOtherDelays(4).from }}
          </td>
          <td style="width: 10%" class="value">
            {{ arrivalOtherDelays(4).to }}
          </td>
          <td style="width: 35%" class="value">
            {{ arrivalOtherDelays(4).code }}
            <span
              v-if="
                arrivalOtherDelays(4).comment != '' &&
                arrivalOtherDelays(4).comment != null
              "
            >
              <br />
              <span
                style="
                  color: black !important;
                  margin-right: 10px;
                  font-size: 16px;
                "
                >Comment :</span
              >
              <span v-html="arrivalOtherDelays(4).comment"> </span>
            </span>
            <span v-else>
              <br />
              <span
                style="
                  color: black !important;
                  margin-right: 10px;
                  font-size: 16px;
                "
                >Reason :</span
              >
              <span>{{ arrivalOtherDelays(4).reason }} </span>
            </span>
          </td>
        </tr>
        <tr>
          <td style="width: 10%" class="value">
            {{ getCrane(arrivalOtherDelays(5).crane_id).craneId }}
          </td>
          <td style="width: 10%" class="value">
            {{ arrivalOtherDelays(5).from }}
          </td>
          <td style="width: 10%" class="value">
            {{ arrivalOtherDelays(5).to }}
          </td>
          <td style="width: 35%" class="value">
            {{ arrivalOtherDelays(5).code }}
            <span
              v-if="
                arrivalOtherDelays(5).comment != '' &&
                arrivalOtherDelays(5).comment != null
              "
            >
              <br />
              <span
                style="
                  color: black !important;
                  margin-right: 10px;
                  font-size: 16px;
                "
                >Comment :</span
              >
              <span v-html="arrivalOtherDelays(5).comment"> </span>
            </span>
            <span v-else>
              <br />
              <span
                style="
                  color: black !important;
                  margin-right: 10px;
                  font-size: 16px;
                "
                >Reason :</span
              >
              <span>{{ arrivalOtherDelays(5).reason }} </span>
            </span>
          </td>
        </tr>
        <tr>
          <td style="width: 10%" class="value">
            {{ getCrane(arrivalOtherDelays(6).crane_id).craneId }}
          </td>
          <td style="width: 10%" class="value">
            {{ arrivalOtherDelays(6).from }}
          </td>
          <td style="width: 10%" class="value">
            {{ arrivalOtherDelays(6).to }}
          </td>
          <td style="width: 35%" class="value">
            {{ arrivalOtherDelays(6).code }}
            <span
              v-if="
                arrivalOtherDelays(6).comment != '' &&
                arrivalOtherDelays(6).comment != null
              "
            >
              <br />
              <span
                style="
                  color: black !important;
                  margin-right: 10px;
                  font-size: 16px;
                "
                >Comment :</span
              >
              <span v-html="arrivalOtherDelays(6).comment"> </span>
            </span>
            <span v-else>
              <br />
              <span
                style="
                  color: black !important;
                  margin-right: 10px;
                  font-size: 16px;
                "
                >Reason :</span
              >
              <span>{{ arrivalOtherDelays(6).reason }} </span>
            </span>
          </td>
        </tr>
        <tr
          v-for="n in Other_delaysArrLength - 7 > 0
            ? Other_delaysArrLength - 7
            : 0"
          :key="n"
        >
          <td style="width: 10%" class="value">
            {{ getCrane(arrivalOtherDelays(n - 1).crane_id).craneId }}
          </td>
          <td style="width: 10%" class="value">
            {{ arrivalOtherDelays(n - 1).from }}
          </td>
          <td style="width: 10%" class="value">
            {{ arrivalOtherDelays(n - 1).to }}
          </td>
          <td style="width: 35%" class="value">
            {{ arrivalOtherDelays(n - 1).code }}
            <span
              v-if="
                arrivalOtherDelays(n - 1).comment != '' &&
                arrivalOtherDelays(n - 1).comment != null
              "
            >
              <br />
              <span
                style="
                  color: black !important;
                  margin-right: 10px;
                  font-size: 16px;
                "
                >Comment :</span
              >
              <span v-html="arrivalOtherDelays(n - 1).comment"> </span>
            </span>
            <span v-else>
              <br />
              <span
                style="
                  color: black !important;
                  margin-right: 10px;
                  font-size: 16px;
                "
                >Reason :</span
              >
              <span>{{ arrivalOtherDelays(n - 1).reason }} </span>
            </span>
          </td>
        </tr>
      </table>
    </div>
    <div class="vesselArrival" style="margin-top: 15px; margin-bottom: 15px">
      VESSEL DEPARTURE
    </div>
    <div style="width: 100%; margin-top: 30px; margin-bottom: 30px">
      <table style="width: 100%">
        <thead>
          <tr>
            <th style="width: 20%; border: none"></th>
            <th style="width: 20%" colspan="2">Date/Time</th>
            <th style="width: 40%">COMMENTS</th>
          </tr>
        </thead>

        <tr>
          <td>Last Lift</td>

          <td class="value" colspan="2">{{ voyage.last_lift_to }}</td>
          <td colspan="3" class="value">{{ voyage.last_lift_comment }}</td>
        </tr>
        <tr>
          <td>Lashing Finished</td>
          <td class="value" colspan="2">{{ voyage.lf_to }}</td>
          <td colspan="3" class="value">{{ voyage.lf_comment }}</td>
        </tr>
        <tr>
          <td>Agent Onboard</td>
          <td class="value" colspan="2">{{ voyage.agent_onboard_to }}</td>
          <td colspan="3" class="value">{{ voyage.agent_onboard_comment }}</td>
        </tr>
        <tr>
          <td>Safety Net Off + Gangway up</td>
          <td class="value" colspan="2">{{ voyage.safety_net_gangway_to }}</td>
          <td colspan="3" class="value">
            {{ voyage.safety_net_gangway_comment }}
          </td>
        </tr>
        <tr>
          <td>Pilot Onboard</td>
          <td class="value" colspan="2">{{ voyage.pilot_onboard_to }}</td>
          <td colspan="3" class="value">{{ voyage.pilot_onboard_comment }}</td>
        </tr>
        <tr>
          <td>Tugs arrived</td>
          <td class="value" colspan="2">{{ voyage.tugs_arrived_to }}</td>
          <td colspan="3" class="value">{{ voyage.tugs_arrived_comment }}</td>
        </tr>
        <tr>
          <td>Unmooring Forward</td>
          <td class="value">
            <span style="color: black">From : </span
            >{{ voyage.unmooring_forward_from }}
          </td>
          <td class="value">
            <span style="color: black">To : </span
            >{{ voyage.unmooring_forward_to }}
          </td>
          <td colspan="3" class="value">
            {{ voyage.unmooring_forward_comment }}
          </td>
        </tr>
        <tr>
          <td>Unmooring Aft</td>
          <td class="value">
            <span style="color: black">From : </span
            >{{ voyage.unmooring_aft_from }}
          </td>
          <td class="value">
            <span style="color: black">To : </span>{{ voyage.unmooring_aft_to }}
          </td>
          <td colspan="3" class="value">{{ voyage.unmooring_aft_comment }}</td>
        </tr>
        <tr>
          <td>Last Line</td>
          <td class="value" colspan="2">{{ voyage.last_line_to }}</td>
          <td colspan="3" class="value">{{ voyage.last_line_comment }}</td>
        </tr>
      </table>
    </div>
    <div style="width: 100%; margin-top: 30px; margin-bottom: 30px">
      <table style="width: 100%">
        <tr>
          <td style="width: 10%">Crane ID.</td>
          <td style="width: 10%">From</td>
          <td style="width: 10%">To</td>
          <td style="width: 35%">Reason/Comments</td>
          <td style="width: 35%">Please note the following</td>
        </tr>
        <tr>
          <td style="width: 10%" class="value">
            {{ getCrane(departureOtherDelays(0).crane_id).craneId }}
          </td>
          <td style="width: 10%" class="value">
            {{ departureOtherDelays(0).from }}
          </td>
          <td style="width: 10%" class="value">
            {{ departureOtherDelays(0).to }}
          </td>
          <td style="width: 35%" class="value">
            {{ departureOtherDelays(0).code }}
            <span
              v-if="
                departureOtherDelays(0).comment != '' &&
                departureOtherDelays(0).comment != null
              "
            >
              <br />
              <span
                style="
                  color: black !important;
                  margin-right: 10px;
                  font-size: 16px;
                "
                >Comment :</span
              >
              <span v-html="departureOtherDelays(0).comment"> </span>
            </span>
            <span v-else>
              <br />
              <span
                style="
                  color: black !important;
                  margin-right: 10px;
                  font-size: 16px;
                "
                >Reason :</span
              >
              <span>{{ departureOtherDelays(0).reason }} </span>
            </span>
          </td>
          <td
            style="width: 35%"
            :rowspan="Other_delaysDepLength > 8 ? Other_delaysDepLength : 8"
          >
            NB: Delays to be recorded should exclude the normal operations
            stipulated above (Agent - Safety net+Gangway - Pilot - Tugs -
            Unmooring…) For example: Maneuvring Sequence/ Waiting for ship's
            crane to be put in position / Malfunction reefer/ Stowaway
            search/Vessel engine breakdown/Weather/Restows requested by
            vessel/Fresh water supply/etc...
          </td>
        </tr>
        <tr>
          <td style="width: 10%" class="value">
            {{ getCrane(departureOtherDelays(1).crane_id).craneId }}
          </td>
          <td style="width: 10%" class="value">
            {{ departureOtherDelays(1).from }}
          </td>
          <td style="width: 10%" class="value">
            {{ departureOtherDelays(1).to }}
          </td>
          <td style="width: 35%" class="value">
            {{ departureOtherDelays(1).code }}
            <span
              v-if="
                departureOtherDelays(1).comment != '' &&
                departureOtherDelays(1).comment != null
              "
            >
              <br />
              <span
                style="
                  color: black !important;
                  margin-right: 10px;
                  font-size: 16px;
                "
                >Comment :</span
              >
              <span v-html="departureOtherDelays(1).comment"> </span>
            </span>
            <span v-else>
              <br />
              <span
                style="
                  color: black !important;
                  margin-right: 10px;
                  font-size: 16px;
                "
                >Reason :</span
              >
              <span>{{ departureOtherDelays(1).reason }} </span>
            </span>
          </td>
        </tr>
        <tr>
          <td style="width: 10%" class="value">
            {{ getCrane(departureOtherDelays(2).crane_id).craneId }}
          </td>
          <td style="width: 10%" class="value">
            {{ departureOtherDelays(2).from }}
          </td>
          <td style="width: 10%" class="value">
            {{ departureOtherDelays(2).to }}
          </td>
          <td style="width: 35%" class="value">
            {{ departureOtherDelays(2).code }}
            <span
              v-if="
                departureOtherDelays(2).comment != '' &&
                departureOtherDelays(2).comment != null
              "
            >
              <br />
              <span
                style="
                  color: black !important;
                  margin-right: 10px;
                  font-size: 16px;
                "
                >Comment :</span
              >
              <span v-html="departureOtherDelays(2).comment"> </span>
            </span>
            <span v-else>
              <br />
              <span
                style="
                  color: black !important;
                  margin-right: 10px;
                  font-size: 16px;
                "
                >Reason :</span
              >
              <span>{{ departureOtherDelays(2).reason }} </span>
            </span>
          </td>
        </tr>
        <tr>
          <td style="width: 10%" class="value">
            {{ getCrane(departureOtherDelays(3).crane_id).craneId }}
          </td>
          <td style="width: 10%" class="value">
            {{ departureOtherDelays(3).from }}
          </td>
          <td style="width: 10%" class="value">
            {{ departureOtherDelays(3).to }}
          </td>
          <td style="width: 35%" class="value">
            {{ departureOtherDelays(3).code }}
            <span
              v-if="
                departureOtherDelays(3).comment != '' &&
                departureOtherDelays(3).comment != null
              "
            >
              <br />
              <span
                style="
                  color: black !important;
                  margin-right: 10px;
                  font-size: 16px;
                "
                >Comment :</span
              >
              <span v-html="departureOtherDelays(3).comment"> </span>
            </span>
            <span v-else>
              <br />
              <span
                style="
                  color: black !important;
                  margin-right: 10px;
                  font-size: 16px;
                "
                >Reason :</span
              >
              <span>{{ departureOtherDelays(3).reason }} </span>
            </span>
          </td>
        </tr>
        <tr>
          <td style="width: 10%" class="value">
            {{ getCrane(departureOtherDelays(4).crane_id).craneId }}
          </td>
          <td style="width: 10%" class="value">
            {{ departureOtherDelays(4).from }}
          </td>
          <td style="width: 10%" class="value">
            {{ departureOtherDelays(4).to }}
          </td>
          <td style="width: 35%" class="value">
            {{ departureOtherDelays(4).code }}
            <span
              v-if="
                departureOtherDelays(4).comment != '' &&
                departureOtherDelays(4).comment != null
              "
            >
              <br />
              <span
                style="
                  color: black !important;
                  margin-right: 10px;
                  font-size: 16px;
                "
                >Comment :</span
              >
              <span v-html="departureOtherDelays(4).comment"> </span>
            </span>
            <span v-else>
              <br />
              <span
                style="
                  color: black !important;
                  margin-right: 10px;
                  font-size: 16px;
                "
                >Reason :</span
              >
              <span>{{ departureOtherDelays(4).reason }} </span>
            </span>
          </td>
        </tr>
        <tr>
          <td style="width: 10%" class="value">
            {{ getCrane(departureOtherDelays(5).crane_id).craneId }}
          </td>
          <td style="width: 10%" class="value">
            {{ departureOtherDelays(5).from }}
          </td>
          <td style="width: 10%" class="value">
            {{ departureOtherDelays(5).to }}
          </td>
          <td style="width: 35%" class="value">
            {{ departureOtherDelays(5).code }}
            <span
              v-if="
                departureOtherDelays(5).comment != '' &&
                departureOtherDelays(5).comment != null
              "
            >
              <br />
              <span
                style="
                  color: black !important;
                  margin-right: 10px;
                  font-size: 16px;
                "
                >Comment :</span
              >
              <span v-html="departureOtherDelays(5).comment"> </span>
            </span>
            <span v-else>
              <br />
              <span
                style="
                  color: black !important;
                  margin-right: 10px;
                  font-size: 16px;
                "
                >Reason :</span
              >
              <span>{{ departureOtherDelays(5).reason }} </span>
            </span>
          </td>
        </tr>
        <tr>
          <td style="width: 10%" class="value">
            {{ getCrane(departureOtherDelays(6).crane_id).craneId }}
          </td>
          <td style="width: 10%" class="value">
            {{ departureOtherDelays(6).from }}
          </td>
          <td style="width: 10%" class="value">
            {{ departureOtherDelays(6).to }}
          </td>
          <td style="width: 35%" class="value">
            {{ departureOtherDelays(6).code }}
            <span
              v-if="
                departureOtherDelays(6).comment != '' &&
                departureOtherDelays(6).comment != null
              "
            >
              <br />
              <span
                style="
                  color: black !important;
                  margin-right: 10px;
                  font-size: 16px;
                "
                >Comment :</span
              >
              <span v-html="departureOtherDelays(6).comment"> </span>
            </span>
            <span v-else>
              <br />
              <span
                style="
                  color: black !important;
                  margin-right: 10px;
                  font-size: 16px;
                "
                >Reason :</span
              >
              <span>{{ departureOtherDelays(6).reason }} </span>
            </span>
          </td>
        </tr>
        <tr>
          <td style="width: 10%" class="value">
            {{ getCrane(departureOtherDelays(7).crane_id).craneId }}
          </td>
          <td style="width: 10%" class="value">
            {{ departureOtherDelays(7).from }}
          </td>
          <td style="width: 10%" class="value">
            {{ departureOtherDelays(7).to }}
          </td>
          <td style="width: 35%" class="value">
            {{ departureOtherDelays(7).code }}
            <span
              v-if="
                departureOtherDelays(7).comment != '' &&
                departureOtherDelays(7).comment != null
              "
            >
              <br />
              <span
                style="
                  color: black !important;
                  margin-right: 10px;
                  font-size: 16px;
                "
                >Comment :</span
              >
              <span v-html="departureOtherDelays(7).comment"> </span>
            </span>
            <span v-else>
              <br />
              <span
                style="
                  color: black !important;
                  margin-right: 10px;
                  font-size: 16px;
                "
                >Reason :</span
              >
              <span>{{ departureOtherDelays(7).reason }} </span>
            </span>
          </td>
        </tr>
        <tr
          v-for="n in Other_delaysArrLength - 8 > 0
            ? Other_delaysArrLength - 8
            : 0"
          :key="n"
        >
          <td style="width: 10%" class="value">
            {{ getCrane(departureOtherDelays(n - 1).crane_id).craneId }}
          </td>
          <td style="width: 10%" class="value">
            {{ departureOtherDelays(n - 1).from }}
          </td>
          <td style="width: 10%" class="value">
            {{ departureOtherDelays(n - 1).to }}
          </td>
          <td style="width: 35%" class="value">
            {{ departureOtherDelays(n - 1).code }}
            <span
              v-if="
                departureOtherDelays(n - 1).comment != '' &&
                departureOtherDelays(n - 1).comment != null
              "
            >
              <br />
              <span
                style="
                  color: black !important;
                  margin-right: 10px;
                  font-size: 16px;
                "
                >Comment :</span
              >
              <span v-html="departureOtherDelays(n - 1).comment"> </span>
            </span>
            <span v-else>
              <br />
              <span
                style="
                  color: black !important;
                  margin-right: 10px;
                  font-size: 16px;
                "
                >Reason :</span
              >
              <span>{{ departureOtherDelays(n - 1).reason }} </span>
            </span>
          </td>
        </tr>
      </table>
    </div>
  </div>
</template>
<script>
export default {
  props: ["voyage", "cranes"],
  data() {
    return {};
  },
  methods: {
    arrivalOtherDelays(index) {
      const other_delay = {
        ...this.voyage.other_delays.filter((e) => e.dep_arr == "arr")[index],
      };
      if (this.Other_delaysArrLength < index + 1 || !other_delay)
        return {
          id: "",
          from: "",
          to: "",
          reason: "",
          dep_arr: "",
          voyage_id: "",
          crane_id: "",
          created_at: "",
          updated_at: "",
        };

      return other_delay;
    },
    departureOtherDelays(index) {
      const other_delay = {
        ...this.voyage.other_delays.filter((e) => e.dep_arr == "dep")[index],
      };
      if (this.Other_delaysArrLength < index + 1 || !other_delay)
        return {
          id: "",
          from: "",
          to: "",
          reason: "",
          dep_arr: "",
          voyage_id: "",
          crane_id: "",
          created_at: "",
          updated_at: "",
        };

      return other_delay;
    },
    getCrane(crane_id) {
      if (!crane_id)
        return { id: "", craneId: "", created_at: "", updated_at: "" };

      return this.cranes.filter((e) => e.id == crane_id)[0];
    },
  },
  computed: {
    voyageCraneForSTS1() {
      let crane_voyage = this.voyage.crane_voyages.filter(
        (e) => e.crane_id == 1
      )[0];
      if (crane_voyage == null)
        return {
          cbd: "",
          dgbohc_bfl_from: "",
          dgbohc_bfl_to: "",
          dgbohc_bfl_num_gb: "",
          dgbohc_bfl_num_hc: "",
          dss_bfl_from: "",
          dss_bfl_to: "",
          dss_bfl_num_sp: "",
          dss_bfl_fb_dnw: "",
          crane_id: "",
          ffl: "",
          fll: "",
          sfl: "",
          sll: "",
          tfl: "",
          tll: "",
          lgbohc_all_from: "",
          lgbohc_all_to: "",
          lgbohc_all_num_gb: "",
          lgbohc_all_hc: "",
          lgbohc_all_inbay: "",
          pgb_r_co: "",
          pgb_r_co_reason: "",
          lss_all_from: "",
          lss_all_to: "",
          lss_all_num_ss: "",
          lss_all_ib_lnw: "",
          cbu: "",
          id: "",
          voyage_id: "",
        };
      return crane_voyage;
    },
    voyageCraneForSTS2() {
      let crane_voyage = this.voyage.crane_voyages.filter(
        (e) => e.crane_id == 2
      )[0];
      if (crane_voyage == null)
        return {
          cbd: "",
          dgbohc_bfl_from: "",
          dgbohc_bfl_to: "",
          dgbohc_bfl_num_gb: "",
          dgbohc_bfl_num_hc: "",
          dss_bfl_from: "",
          dss_bfl_to: "",
          dss_bfl_num_sp: "",
          dss_bfl_fb_dnw: "",
          crane_id: "",
          ffl: "",
          fll: "",
          sfl: "",
          sll: "",
          tfl: "",
          tll: "",
          lgbohc_all_from: "",
          lgbohc_all_to: "",
          lgbohc_all_num_gb: "",
          lgbohc_all_hc: "",
          lgbohc_all_inbay: "",
          pgb_r_co: "",
          pgb_r_co_reason: "",
          lss_all_from: "",
          lss_all_to: "",
          lss_all_num_ss: "",
          lss_all_ib_lnw: "",
          cbu: "",
          id: "",
          voyage_id: "",
        };
      return crane_voyage;
    },
    voyageCraneForSTS3() {
      let crane_voyage = this.voyage.crane_voyages.filter(
        (e) => e.crane_id == 3
      )[0];
      if (crane_voyage == null)
        return {
          cbd: "",
          dgbohc_bfl_from: "",
          dgbohc_bfl_to: "",
          dgbohc_bfl_num_gb: "",
          dgbohc_bfl_num_hc: "",
          dss_bfl_from: "",
          dss_bfl_to: "",
          dss_bfl_num_sp: "",
          dss_bfl_fb_dnw: "",
          crane_id: "",
          ffl: "",
          fll: "",
          sfl: "",
          sll: "",
          tfl: "",
          tll: "",
          lgbohc_all_from: "",
          lgbohc_all_to: "",
          lgbohc_all_num_gb: "",
          lgbohc_all_hc: "",
          lgbohc_all_inbay: "",
          pgb_r_co: "",
          pgb_r_co_reason: "",
          lss_all_from: "",
          lss_all_to: "",
          lss_all_num_ss: "",
          lss_all_ib_lnw: "",
          cbu: "",
          id: "",
          voyage_id: "",
        };
      return crane_voyage;
    },
    voyageCraneForSTS4() {
      let crane_voyage = this.voyage.crane_voyages.filter(
        (e) => e.crane_id == 4
      )[0];
      if (crane_voyage == null)
        return {
          cbd: "",
          dgbohc_bfl_from: "",
          dgbohc_bfl_to: "",
          dgbohc_bfl_num_gb: "",
          dgbohc_bfl_num_hc: "",
          dss_bfl_from: "",
          dss_bfl_to: "",
          dss_bfl_num_sp: "",
          dss_bfl_fb_dnw: "",
          crane_id: "",
          ffl: "",
          fll: "",
          sfl: "",
          sll: "",
          tfl: "",
          tll: "",
          lgbohc_all_from: "",
          lgbohc_all_to: "",
          lgbohc_all_num_gb: "",
          lgbohc_all_hc: "",
          lgbohc_all_inbay: "",
          pgb_r_co: "",
          pgb_r_co_reason: "",
          lss_all_from: "",
          lss_all_to: "",
          lss_all_num_ss: "",
          lss_all_ib_lnw: "",
          cbu: "",
          id: "",
          voyage_id: "",
        };
      return crane_voyage;
    },
    voyageCraneForSTS5() {
      let crane_voyage = this.voyage.crane_voyages.filter(
        (e) => e.crane_id == 5
      )[0];
      if (crane_voyage == null)
        return {
          cbd: "",
          dgbohc_bfl_from: "",
          dgbohc_bfl_to: "",
          dgbohc_bfl_num_gb: "",
          dgbohc_bfl_num_hc: "",
          dss_bfl_from: "",
          dss_bfl_to: "",
          dss_bfl_num_sp: "",
          dss_bfl_fb_dnw: "",
          crane_id: "",
          ffl: "",
          fll: "",
          sfl: "",
          sll: "",
          tfl: "",
          tll: "",
          lgbohc_all_from: "",
          lgbohc_all_to: "",
          lgbohc_all_num_gb: "",
          lgbohc_all_hc: "",
          lgbohc_all_inbay: "",
          pgb_r_co: "",
          pgb_r_co_reason: "",
          lss_all_from: "",
          lss_all_to: "",
          lss_all_num_ss: "",
          lss_all_ib_lnw: "",
          cbu: "",
          id: "",
          voyage_id: "",
        };
      return crane_voyage;
    },
    voyageCraneForSTS6() {
      let crane_voyage = this.voyage.crane_voyages.filter(
        (e) => e.crane_id == 6
      )[0];
      if (crane_voyage == null)
        return {
          cbd: "",
          dgbohc_bfl_from: "",
          dgbohc_bfl_to: "",
          dgbohc_bfl_num_gb: "",
          dgbohc_bfl_num_hc: "",
          dss_bfl_from: "",
          dss_bfl_to: "",
          dss_bfl_num_sp: "",
          dss_bfl_fb_dnw: "",
          crane_id: "",
          ffl: "",
          fll: "",
          sfl: "",
          sll: "",
          tfl: "",
          tll: "",
          lgbohc_all_from: "",
          lgbohc_all_to: "",
          lgbohc_all_num_gb: "",
          lgbohc_all_hc: "",
          lgbohc_all_inbay: "",
          pgb_r_co: "",
          pgb_r_co_reason: "",
          lss_all_from: "",
          lss_all_to: "",
          lss_all_num_ss: "",
          lss_all_ib_lnw: "",
          cbu: "",
          id: "",
          voyage_id: "",
        };
      return crane_voyage;
    },
    voyageCraneForSTS7() {
      let crane_voyage = this.voyage.crane_voyages.filter(
        (e) => e.crane_id == 7
      )[0];
      if (crane_voyage == null)
        return {
          cbd: "",
          dgbohc_bfl_from: "",
          dgbohc_bfl_to: "",
          dgbohc_bfl_num_gb: "",
          dgbohc_bfl_num_hc: "",
          dss_bfl_from: "",
          dss_bfl_to: "",
          dss_bfl_num_sp: "",
          dss_bfl_fb_dnw: "",
          crane_id: "",
          ffl: "",
          fll: "",
          sfl: "",
          sll: "",
          tfl: "",
          tll: "",
          lgbohc_all_from: "",
          lgbohc_all_to: "",
          lgbohc_all_num_gb: "",
          lgbohc_all_hc: "",
          lgbohc_all_inbay: "",
          pgb_r_co: "",
          pgb_r_co_reason: "",
          lss_all_from: "",
          lss_all_to: "",
          lss_all_num_ss: "",
          lss_all_ib_lnw: "",
          cbu: "",
          id: "",
          voyage_id: "",
        };
      return crane_voyage;
    },
    voyageCraneForSTS8() {
      let crane_voyage = this.voyage.crane_voyages.filter(
        (e) => e.crane_id == 8
      )[0];
      if (crane_voyage == null)
        return {
          cbd: "",
          dgbohc_bfl_from: "",
          dgbohc_bfl_to: "",
          dgbohc_bfl_num_gb: "",
          dgbohc_bfl_num_hc: "",
          dss_bfl_from: "",
          dss_bfl_to: "",
          dss_bfl_num_sp: "",
          dss_bfl_fb_dnw: "",
          crane_id: "",
          ffl: "",
          fll: "",
          sfl: "",
          sll: "",
          tfl: "",
          tll: "",
          lgbohc_all_from: "",
          lgbohc_all_to: "",
          lgbohc_all_num_gb: "",
          lgbohc_all_hc: "",
          lgbohc_all_inbay: "",
          pgb_r_co: "",
          pgb_r_co_reason: "",
          lss_all_from: "",
          lss_all_to: "",
          lss_all_num_ss: "",
          lss_all_ib_lnw: "",
          cbu: "",
          id: "",
          voyage_id: "",
        };
      return crane_voyage;
    },
    Other_delaysArrLength() {
      return this.voyage.other_delays.filter((e) => e.dep_arr == "arr").length;
    },
    Other_delaysDepLength() {
      return this.voyage.other_delays.filter((e) => e.dep_arr == "dep").length;
    },
  },
  mounted() {},
};
</script>
<style scoped lang="scss">
.content {
  width: 90%;
  padding-top: 20px;
  margin: 0 auto;
}
th,
td {
  border: 1px solid #4fc3f7;
  text-align: center;
}
.vesselArrival {
  width: 33.33%;
  margin: 0 auto;
  background-color: rgb(250, 191, 143);
  text-align: center;
  border: 2px solid black;
  height: 35px;
  padding-top: 5px;
  letter-spacing: 5px;
  word-spacing: 8px;
}
.sectionVesselArrived {
  margin-top: 15px;
  .sectionVesselArrivedTable {
    display: inline-block;
    width: 45%;
    table,
    th,
    td {
      width: 100%;
    }
  }
  * {
    text-align: center;
  }
}
.damagedCountained {
  margin-right: 30px;
  float: right;
}
.arrivalFirstTable {
  clear: both;
  padding-top: 20px;

  td {
  }
}
* {
  font-size: 11px;
  font-family: sans-serif;
  font-weight: 900;
}
.rotate {
  display: block;
  transform: rotate(-90deg);

  /* Legacy vendor prefixes that you probably don't need... */

  /* Safari */
  -webkit-transform: rotate(-90deg);

  /* Firefox */
  -moz-transform: rotate(-90deg);

  /* IE */
  -ms-transform: rotate(-90deg);

  /* Opera */
  -o-transform: rotate(-90deg);

  /* Internet Explorer */
  filter: progid:DXImageTransform.Microsoft.BasicImage(rotation=3);
  word-wrap: break-word;
  white-space: nowrap;
}
td {
  height: 32px;
}
table {
  border-spacing: 0;
}
.value {
  font-size: 11px;
  color: blue;
}
</style>
