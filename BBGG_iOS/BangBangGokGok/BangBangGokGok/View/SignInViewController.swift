//
//  SignInViewController.swift
//  BangBangGokGok
//
//  Created by 권태우 on 2023/01/09.
//

import UIKit

class SignInViewController: UIViewController {
    @IBOutlet weak var tfId: UITextField!
    @IBOutlet weak var tfPw: UITextField!
    var isSignedIn = true
    
    override func viewDidLoad() {
        super.viewDidLoad()
        // Do any additional setup after loading the view.
        
        if (isSignedIn){
            pushViewController(vcName: "home")
        }
    }

    @IBAction func btnSignIn(_ sender: UIButton) {
        if (
            tfId.text == "go8882"
        ){
            if (tfPw.text == "test1234"){
                pushViewController(vcName: "home")
            }
        }
    }
    
    func pushViewController(vcName: String){
        let pushVC = self.storyboard?.instantiateViewController(withIdentifier: vcName)
        self.navigationController?.pushViewController(pushVC!, animated: true)
    }

} // SignInViewController

