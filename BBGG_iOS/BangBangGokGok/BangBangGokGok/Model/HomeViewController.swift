//
//  HomeViewController.swift
//  BangBangGokGok
//
//  Created by 권태우 on 2023/05/10.
//

import UIKit

class HomeViewController: UIViewController {
    @IBOutlet weak var lblRecoReg: UILabel!
    @IBOutlet weak var imgBanner: UIImageView!
    @IBOutlet weak var lblPercentage: UILabel!
    @IBOutlet weak var progressView: UIProgressView!
    
    override func viewDidLoad() {
        super.viewDidLoad()

        // Do any additional setup after loading the view.
        
        lblRecoReg.text = "이달의 추천 여행지"
        lblPercentage.text = "전국일주 완료율"
//        progressView.progress 
    }
    

    /*
    // MARK: - Navigation

    // In a storyboard-based application, you will often want to do a little preparation before navigation
    override func prepare(for segue: UIStoryboardSegue, sender: Any?) {
        // Get the new view controller using segue.destination.
        // Pass the selected object to the new view controller.
    }
    */
    
    @IBAction func btnVisited(_ sender: UIButton) { // Show visited regions
        
    }
    
}
