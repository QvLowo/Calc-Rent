(function () {
    'use strict';

    document.getElementById("year").textContent = new Date().getFullYear();
    document.getElementById("month").textContent = new Date().getMonth() + 1;

    function sanitizeAndValidateNumber(value, min = 0, max = 999999) {
        let cleaned = String(value).replace(/[^\d.]/g, '');

        const parts = cleaned.split('.');
        if (parts.length > 2) {
            cleaned = parts[0] + '.' + parts.slice(1).join('');
        }

        let num = parseFloat(cleaned);

        if (isNaN(num) || !isFinite(num)) {
            return null;
        }

        if (num < min) num = min;
        if (num > max) num = max;

        num = Math.round(num * 10) / 10;

        return num;
    }

    function escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    function calculateTotal() {
        const initialInput = document.getElementById("initial");
        const finalInput = document.getElementById("final");

        let initial = sanitizeAndValidateNumber(initialInput.value);
        let final = sanitizeAndValidateNumber(finalInput.value);

        if (initial === null || final === null) {
            document.getElementById("count").value = "請輸入有效數字";
            document.getElementById("energy").value = "";
            document.getElementById("total").value = "";
            return false;
        }

        if (final < initial) {
            document.getElementById("count").value = "Error! 最終電表不能小於初始電表";
            document.getElementById("energy").value = "";
            document.getElementById("total").value = "";
            return false;
        }

        let count = final - initial;
        let totalCost = count * 5;

        document.getElementById("count").value = count.toFixed(1);
        document.getElementById("total").value = totalCost.toFixed(0);
        document.getElementById("energy").value =
            `電費：${final.toFixed(1)} - ${initial.toFixed(1)} = ${count.toFixed(1)} 度 × 5 元 = ${totalCost.toFixed(0)} 元`;

        return true;
    }

    function calc() {
        if (!calculateTotal()) {
            alert("請檢查電表數值！");
            return;
        }

        let pricePerMonth = sanitizeAndValidateNumber(
            document.getElementById("pricePerMonth").value, 0, 999999
        ) || 0;

        let gasFee = sanitizeAndValidateNumber(
            document.getElementById("gasFee").value, 0, 99999
        ) || 0;

        let total = sanitizeAndValidateNumber(
            document.getElementById("total").value, 0, 999999
        ) || 0;

        let totalAmount = pricePerMonth + gasFee + total;

        document.getElementById("series").value =
            `租金：${pricePerMonth} + 瓦斯費：${gasFee} + 電費：${total} = ${totalAmount} 元`;
        document.getElementById("totalAmount").value = totalAmount;
        document.getElementById("money").textContent = totalAmount;
    }

    function reset() {
        const inputs = ['initial', 'final', 'count', 'energy', 'total', 'series', 'totalAmount'];
        inputs.forEach(id => {
            const element = document.getElementById(id);
            if (element && !element.readOnly) {
                element.value = "";
            } else if (element) {
                element.value = "";
            }
        });
        document.getElementById("money").textContent = "0";

        document.getElementById("pricePerMonth").value = "18900";
        document.getElementById("gasFee").value = "400";
    }

    document.getElementById("initial").addEventListener('input', calculateTotal);
    document.getElementById("final").addEventListener('input', calculateTotal);
    document.getElementById("calcBtn").addEventListener('click', calc);
    document.getElementById("resetBtn").addEventListener('click', reset);

    const numberInputs = document.querySelectorAll('input[type="number"]');
    numberInputs.forEach(input => {
        input.addEventListener('keypress', function (e) {
            const char = String.fromCharCode(e.which);
            if (!/[\d.]/.test(char) && e.which !== 8 && e.which !== 46) {
                e.preventDefault();
            }
        });

        input.addEventListener('paste', function (e) {
            e.preventDefault();
            const pastedText = (e.clipboardData || window.clipboardData).getData('text');
            const cleaned = pastedText.replace(/[^\d.]/g, '');
            this.value = cleaned;
            calculateTotal();
        });
    });

})();