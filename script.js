/*jslint browser */
(function () {
    "use strict";

    const prices = {
        mug: {base: 300, options: null, prop: false},
        shirt: {
            base: 800,
            options: [
                {title: "Хлопок", price: 0},
                {title: "Премиум-хлопок", price: 300},
                {title: "Футер", price: 500}
            ],
            prop: false
        },
        poster: {base: 500, options: null, prop: true}
    };
    const LAMINATION_PRICE = 150;

    function getKind() {
        return document.querySelector("input[name=kind]:checked").value;
    }

    function fillOptions(select, options) {
        select.innerHTML = "";
        options.forEach(function (item, index) {
            const option = document.createElement("option");
            option.value = String(index);
            option.textContent = item.title + " (+" + item.price + " ₽)";
            select.appendChild(option);
        });
    }

    function updateVisibility() {
        const kind = prices[getKind()];
        const select = document.getElementById("opt");
        document.getElementById("opt-box").classList.toggle(
            "hidden",
            kind.options === null
        );
        document.getElementById("prop-box").classList.toggle(
            "hidden",
            !kind.prop
        );
        if (kind.options !== null) {
            fillOptions(select, kind.options);
        }
        document.getElementById("prop").checked = false;
    }

    function recalc() {
        const kind = prices[getKind()];
        const qty = Math.floor(Number(document.getElementById("qty").value));
        const output = document.getElementById("total");
        let unit = kind.base;
        if (kind.options !== null) {
            unit += kind.options[
                Number(document.getElementById("opt").value)
            ].price;
        }
        if (kind.prop && document.getElementById("prop").checked) {
            unit += LAMINATION_PRICE;
        }
        output.textContent = (qty > 0)
            ? String(unit * qty)
            : "0";
    }

    window.addEventListener("DOMContentLoaded", function () {
        document.getElementById("qty").addEventListener("input", recalc);
        document.getElementById("opt").addEventListener("change", recalc);
        document.getElementById("prop").addEventListener("change", recalc);
        document.querySelectorAll("input[name=kind]").forEach(function (r) {
            r.addEventListener("change", function () {
                updateVisibility();
                recalc();
            });
        });
        updateVisibility();
        recalc();
    });
}());
