using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.SceneManagement;

public class TransitionPanel : MonoBehaviour
{
    public string name;
    public bool isActive;

    public void enter()
    {
        Debug.Log("Enter entered: " + name);
        if (isActive)
        {
            Debug.Log("Entered: " + name);
            SceneManager.LoadScene(name);
        }
    }

}
