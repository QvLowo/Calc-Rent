document.getElementById("year").textContent = new Date().getFullYear();
document.getElementById("month").textContent = new Date().getMonth() + 1;

function calculateTotal() {
    let initial = parseFloat(document.getElementById("initial").value) || 0;
    let final = parseFloat(document.getElementById("final").value) || 0;
    let count = final - initial;
    document.getElementById("count").value = count;
    document.getElementById("total").value = count * 5;
    document.getElementById("energy").value = `電費：${final} - ${initial} 為 ${count} 度 * 5 元 = ${count * 5} 元`;
}

function calc() {
    calculateTotal();
    let pricePerMonth = parseFloat(document.getElementById("pricePerMonth").value);
    let gasFee = parseFloat(document.getElementById("gasFee").value);
    let total = parseFloat(document.getElementById("total").value) || 0;
    let totalAmount = pricePerMonth + gasFee + total;
    document.getElementById("series").value = `租金：${pricePerMonth} + 瓦斯費：${gasFee} + 電費：${total} = ${totalAmount} 元`;
    document.getElementById("totalAmount").value = totalAmount;
    document.getElementById("money").textContent = totalAmount;
}

function reset() {
    document.getElementById("initial").value = "";
    document.getElementById("final").value = "";
    document.getElementById("count").value = "";
    document.getElementById("total").value = "";
    document.getElementById("energy").value = "";
    document.getElementById("series").value = "請先計算電費";
    document.getElementById("totalAmount").value = "";
    document.getElementById("money").textContent = "0";
}
