
 import Vue from 'vue'
 import moment from "moment";

 const gToKg = 0.001;
 const gToOz = 0.035274;
 const ozToLb = 0.0625;

 const kmToMi = 0.621371;
 const mToFt = 3.28084;

 Vue.filter("weightUnitFilter", function (value, unit = 'g', sup = true) {
     if (!value) return '0';

     let convertedWeight = null;

     if (unit === 'g') {
         convertedWeight = Math.round(value);

         if(convertedWeight >= 1000 && sup)
             convertedWeight = (Math.round(convertedWeight * gToKg * 10) / 10);

     } else if (unit === 'oz') {
         convertedWeight = (Math.round(value * gToOz * 10) / 10);

         if(convertedWeight >= 96 && sup)
             convertedWeight = (Math.round(convertedWeight * ozToLb * 10) / 10);
    }

     return convertedWeight;
 });

 Vue.filter("supWeightUnitFilter", function (value, unit = 'g') {
     if (!value) return '0';

     if(unit === 'g')
         return (Math.round(value * gToKg * 10) / 10);

     if(unit === 'oz')
         return (Math.round(value * ozToLb * 10) / 10);
 });

 Vue.filter("distanceUnitFilter", function (value, unit = 'km') {
     if (!value) return '0';

     if(unit === 'km')
         return (Math.round(value * 10) / 10);

     if(unit === 'mi')
         return (Math.round(value * kmToMi * 10) / 10);
 });

 Vue.filter("elevationUnitFilter", function (value, unit = 'm') {
     if (!value) return '0';

     if(unit === 'm')
         return Math.round(value);

     if(unit === 'ft')
         return Math.round(value * mToFt);
 });

 Vue.filter("temperatureUnitFilter", function (value, unit = '&#8451;') {
     if (!value) return '0';

     if(unit === '&#8451;') // celsius
         return value;

     if(unit === '&#8457;') // fahrenheit
         return Math.round((value * 9/5) + 32);
 });

 Vue.filter("capitalizeFilter", function (value) {
     if (!value) return '';
     return value.toLowerCase()
         .split(' ')
         .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
         .join(' ');
 });

 Vue.filter("convertSpecialCharsFilter", function (value) {
     if (!value) return '';
     return value.toString().replace(/_/g," / ");
 });

 Vue.filter("removeSlashFilter", function (value) {
     if (!value) return '';
     return value.toString().substring(1);
 });

 Vue.filter("noDashFilter", function (value) {
     if (!value) return '';
     return value.toString().replace(/-+/g," ")
 });

 Vue.filter("singularFilter", function (value) {
     if (!value) return '';
     return value.toString().replace(/s$/,"").replace(/ie$/,"y")
 });

 Vue.filter("roundIntFilter", function (value) {
     if (!value) return 0;
     return (value).toFixed(0);
 });

 Vue.filter("roundDecimalFilter", function (value) {
     if (!value) return 0;
     return (value).toFixed(2);
 });

 Vue.filter("thousandthFilter", function (value) {
     value = parseFloat(value);
     return (value/1000).toFixed(1);
 });

 Vue.filter("percentageFilter", function (value, list, total) {
     let nbInList = total ? total : list.length;
     return (Math.floor((value / nbInList) * 100));
 });

 Vue.filter("minimalDateFilter", function (date, format = 'DD-MM-YY') {
     if(!date)
         return '.';

     return moment(date).format(format);
 });

 Vue.filter("dateFilter", function (date, format = 'dddd Do MMMM - YYYY') {
     if(!date)
         return '.';

     return moment(date).format(format);
 });

 Vue.filter("mobileDayMonthFilter", function (date) {
     if(!date)
         return '.';

     return moment(date).format('DD-MM');
 });

 Vue.filter("minDateFilter", function (date, format = 'MMM Do YY') {
     if(!date)
         return '.';

     return moment(date).format(format);
 });

 Vue.filter("dayMonthFilter", function (date, format = 'dd MMM Do YYYY') {
     if(!date)
         return '.';

     return moment(date).format(format);
 });

 Vue.filter("yearFilter", function (date) {
     if(!date)
         return '';

     return moment(date).format('YYYY');
 });

 Vue.filter("timeFilter", function (time) {
     if(!time)
         return '';

     return moment(time).format('HH:mm');
 });