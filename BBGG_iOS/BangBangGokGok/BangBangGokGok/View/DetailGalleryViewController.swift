//
//  DetailGalleryViewController.swift
//  BangBangGokGok
//
//  Created by 권태우 on 2023/06/22.
//

import UIKit

class DetailGalleryViewController: UIViewController {
    @IBOutlet weak var detailImage: UIImageView!
    
    override func viewDidLoad() {
        super.viewDidLoad()

        // Do any additional setup after loading the view.
        
        detailImage.image = UIImage(named: DetailImage.imgName)
    }
    

    /*
    // MARK: - Navigation

    // In a storyboard-based application, you will often want to do a little preparation before navigation
    override func prepare(for segue: UIStoryboardSegue, sender: Any?) {
        // Get the new view controller using segue.destination.
        // Pass the selected object to the new view controller.
    }
    */

}
