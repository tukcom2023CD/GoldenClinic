//
//  SearchingViewController.swift
//  BangBangGokGok
//
//  Created by 권태우 on 2023/06/22.
//

import UIKit

class SearchingViewController: UIViewController, UITableViewDataSource, UITableViewDelegate {
    @IBOutlet weak var tfSearch: UITextField!
    @IBOutlet weak var resultTableView: UITableView!
    
    let regions = ["시흥", "안동", "구미", "인천", "안산", "전주"]
    var category = ""
    let placesSiheung = ["BBQ 정왕1호점", "하임치킨 시화로데오점", "자담치킨 정왕점"]
    let placesAndong = ["현구피자 정왕점", "수빈피자 시화로데오점", "윾빈이네 피자 정왕점"]
    let placesGumi = ["현구대반점", "더 베이징", "아래향"]
    let placesIncheon = ["현구족발 정왕1호점", "현구보쌈 시화로데오점", "오늘사족 본점"]
    let placesAnsan = ["돼지게티 정왕점", "동대문엽기떡볶이 시화이마트점", "삼첩분식 정왕점"]
    let placesJeonju = ["해피타코야끼&닭꼬치", "써브웨이 시흥정왕점", "버거킹 시흥정왕점"]
    var dataArray: [String] = []
    
    override func viewDidLoad() {
        super.viewDidLoad()

        // Do any additional setup after loading the view.
        
        resultTableView.dataSource = self
        resultTableView.delegate = self
    }

    /*
    // MARK: - Navigation

    // In a storyboard-based application, you will often want to do a little preparation before navigation
    override func prepare(for segue: UIStoryboardSegue, sender: Any?) {
        // Get the new view controller using segue.destination.
        // Pass the selected object to the new view controller.
    }
    */
    
    func numberOfSections(in tableView: UITableView) -> Int {
        // #warning Incomplete implementation, return the number of sections
        return 1
    }

    func tableView(_ tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
        // #warning Incomplete implementation, return the number of rows
        return dataArray.count
    }

    func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell {
        let cell = tableView.dequeueReusableCell(withIdentifier: "resultCell", for: indexPath)

//        cell.textLabel?.text = dataArray[indexPath.row]
        
        var content = cell.defaultContentConfiguration()
        content.text = dataArray[indexPath.row]
        content.image = UIImage(systemName: "figure.walk")
        cell.contentConfiguration = content
        
        return cell
    }

    @IBAction func btnSearch(_ sender: UIButton) {
        if (tfSearch.text?.trimmingCharacters(in: .whitespacesAndNewlines))!.isEmpty{
            let alert = UIAlertController(title: "검색어 없음", message: "검색어를 입력하세요.", preferredStyle: .alert)
            
            let action = UIAlertAction(title: "확인", style: .destructive, handler: { ACTION in
                self.dataArray = []
            })
            alert.addAction(action)
            
            present(alert, animated: true, completion: nil)
        } else {
            if regions.contains(tfSearch.text!) {
                switch tfSearch.text {
                case "시흥":
                    dataArray = placesSiheung
                case "안동":
                    dataArray = placesAndong
                case "구미":
                    dataArray = placesGumi
                case "인천" :
                    dataArray = placesIncheon
                case "안산":
                    dataArray = placesAnsan
                default:
                    dataArray = placesJeonju
                }
            } else {
                let alert = UIAlertController(title: "안내", message: "아직 제공하지 않는 검색어 입니다.\n 추후 업데이트 예정입니다.", preferredStyle: .alert)
                
                let action = UIAlertAction(title: "확인", style: .default, handler: { ACTION in
                    self.tfSearch.text?.removeAll()
                    self.dataArray = []
                    self.resultTableView.reloadData()
                })
                alert.addAction(action)
                
                present(alert, animated: true, completion: nil)
            }
        }
        self.resultTableView.reloadData()
    }
}
