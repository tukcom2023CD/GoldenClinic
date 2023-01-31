//
//  SignUpViewController.swift
//  BangBangGokGok
//
//  Created by 권태우 on 2023/01/30.
//

import UIKit
import Alamofire

class SignUpViewController: UIViewController {
    @IBOutlet weak var tfName: UITextField!
    @IBOutlet weak var tfId: UITextField!
    @IBOutlet weak var tfPassword: UITextField!
    @IBOutlet weak var tfCheckPw: UITextField!
    
    override func viewDidLoad() {
        super.viewDidLoad()

        // Do any additional setup after loading the view.
    }
    
    @IBAction func btnSignUp(_ sender: UIButton) {
        guard let id = tfId.text, !id.isEmpty else { return }
                guard let name = tfName.text, !name.isEmpty else { return }
                guard let password = tfPassword.text, !password.isEmpty else { return }
                let url = "http://localhost:8080/join"
                let param: Parameters = [
                    "username":username,
                    "email":email,
                    "password":password
                ]
                let headers: HTTPHeaders = [
                    "Accept": "application/json"
                ]
                AF.request(url, method: .post, parameters: param, encoding: JSONEncoding.default, headers: headers).responseString() { response in
                        print(response)
                }
    }
    
    /*
    // MARK: - Navigation

    // In a storyboard-based application, you will often want to do a little preparation before navigation
    override func prepare(for segue: UIStoryboardSegue, sender: Any?) {
        // Get the new view controller using segue.destination.
        // Pass the selected object to the new view controller.
    }
     
     guard let email = emailTextField.text, !email.isEmpty else { return }
             guard let username = nametextField.text, !username.isEmpty else { return }
             guard let password = passwordTextField.text, !password.isEmpty else { return }
             let url = "http://localhost:8080/join"
             let param: Parameters = [
                 "username":username,
                 "email":email,
                 "password":password
             ]
             let headers: HTTPHeaders = [
                 "Accept": "application/json"
             ]
             AF.request(url, method: .post, parameters: param, encoding: JSONEncoding.default, headers: headers).responseString() { response in
                     print(response)
             }
    */

} // SignUpViewController
