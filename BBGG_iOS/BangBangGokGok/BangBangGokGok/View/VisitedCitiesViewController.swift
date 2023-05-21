//
//  VisitedCitiesViewController.swift
//  BangBangGokGok
//
//  Created by 권태우 on 2023/04/27.
//

import UIKit

class VisitedCitiesViewController: UITableViewController {
    
    var dataArray: [String] = []

    override func viewDidLoad() {
        super.viewDidLoad()
        dataInit()

        // Uncomment the following line to preserve selection between presentations
        // self.clearsSelectionOnViewWillAppear = false

        // Uncomment the following line to display an Edit button in the navigation bar for this view controller.
        // self.navigationItem.rightBarButtonItem = self.editButtonItem
    }
    
    func dataInit() {
        dataArray.append("서울특별시")
        dataArray.append("경상북도 구미시")
        dataArray.append("경기도 시흥시")
        dataArray.append("대구광역시")
        dataArray.append("부산광역시")
        dataArray.append("광주광역시")
        dataArray.append("경상북도 의성군")
        dataArray.append("전라남도 목포시")
        dataArray.append("경기도 안산시")
        dataArray.append("강원도 철원군")
        dataArray.append("제주특별자치도 제주시")
        dataArray.append("제주특별자치도 서귀포시")
        dataArray.append("세종특별자치시")
    }

    // MARK: - Table view data source

    override func numberOfSections(in tableView: UITableView) -> Int {
        // #warning Incomplete implementation, return the number of sections
        return 1
    }

    override func tableView(_ tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
        // #warning Incomplete implementation, return the number of rows
        return dataArray.count
    }

    override func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell {
        let cell = tableView.dequeueReusableCell(withIdentifier: "visitedCitiesCell", for: indexPath)

//        cell.textLabel?.text = dataArray[indexPath.row]
        
        var content = cell.defaultContentConfiguration()
        content.text = dataArray[indexPath.row]
        content.image = UIImage(systemName: "mappin.and.ellipse")
        cell.contentConfiguration = content
        
        return cell
    }

    /*
    // Override to support conditional editing of the table view.
    override func tableView(_ tableView: UITableView, canEditRowAt indexPath: IndexPath) -> Bool {
        // Return false if you do not want the specified item to be editable.
        return true
    }
    */

//    // Override to support editing the table view.
//    override func tableView(_ tableView: UITableView, commit editingStyle: UITableViewCell.EditingStyle, forRowAt indexPath: IndexPath) {
//        if editingStyle == .delete {
//            // Delete the row from the data source
//            dataArray.remove(at: indexPath.row)
//            tableView.deleteRows(at: [indexPath], with: .fade)
//        } else if editingStyle == .insert {
//            // Create a new instance of the appropriate class, insert it into the array, and add a new row to the table view
//        }
//    }
//
//    // Override to support rearranging the table view.
//    override func tableView(_ tableView: UITableView, moveRowAt fromIndexPath: IndexPath, to: IndexPath) {
//        let itemToMove = dataArray[fromIndexPath.row]
//        dataArray.remove(at: fromIndexPath.row)
//        dataArray.insert(itemToMove, at: to.row)
//    }

    /*
    // Override to support conditional rearranging of the table view.
    override func tableView(_ tableView: UITableView, canMoveRowAt indexPath: IndexPath) -> Bool {
        // Return false if you do not want the item to be re-orderable.
        return true
    }
    */

    /*
    // MARK: - Navigation

    // In a storyboard-based application, you will often want to do a little preparation before navigation
    override func prepare(for segue: UIStoryboardSegue, sender: Any?) {
        // Get the new view controller using segue.destination.
        // Pass the selected object to the new view controller.
    }
    */

//    @IBAction func btnAdd(_ sender: UIBarButtonItem) {
//        let addAlert = UIAlertController(title: "ToDoList", message: "추가할 내용을 입력하세요.", preferredStyle: .alert)
//        addAlert.addTextField{ACTION in
//            ACTION.placeholder = "내용"
//        }
//        let cancelAction = UIAlertAction(title: "취소", style: .default, handler: nil)
//        let addAction = UIAlertAction(title: "추가", style: .destructive, handler: { ACTION in
//            self.dataArray.append(addAlert.textFields![0].text!)
//            self.tvToDoList.reloadData()
//        })
//
//        addAlert.addAction(cancelAction)
//        addAlert.addAction(addAction)
//
//        present(addAlert, animated: true, completion: nil)
//    }
}
