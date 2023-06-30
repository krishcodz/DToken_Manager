import Principal "mo:base/Principal";
import HashMap "mo:base/HashMap";
import Debug "mo:base/Debug";
import Nat "mo:base/Nat";

actor Token{
    var owner : Principal = Principal.fromText("wwehs-k7j2d-ujphl-x442p-oyn4r-37tex-yun3b-vkowy-wft7n-ogyi6-xqe");
    var totalSupply : Nat = 1000000;
    var symbol : Text = "Driz";

    var balances = HashMap.HashMap<Principal, Nat>(1, Principal.equal, Principal.hash);

    balances.put(owner, totalSupply);

    public query func balanceOf(who: Principal) : async Nat {
        let balance : Nat = switch (balances.get(who)) {
            case null 0;
            case (?result) result;
        };
        return balance;
    };

    public query func getSymbol() : async Text {
        return symbol;
    };

    public shared(msg) func payOut() : async Text {
        if(balances.get(msg.caller) == null){
            let amount = 1000;
            // Debug.print(debug_show (msg.caller));
            let result = await transfer(msg.caller, amount);
            return result;
        }
        else{
            return "Already Claimed"
        }
  
    };

    public shared(msg) func transfer(to: Principal, amount: Nat) : async Text {
        let fromAmount : Nat = await balanceOf(msg.caller);
        if(fromAmount > amount){
            let newFromBalance : Nat = fromAmount - amount;
            balances.put(msg.caller, newFromBalance);
            
            let toBalance : Nat = await balanceOf(to);
            let newToBalance : Nat = toBalance + amount;
            balances.put(to, newToBalance); 
            return "success"
        }
        else{
            return "Insufficient Balance"
        }
        
    };
}
